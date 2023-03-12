import fill from 'fill-range';
import { CLEAR_PARSED, FILES_LOADED, WRITE_FILE } from '../actions/counter';

const initState = {
  value: 0,
  loading: true,
  parsedFiles: {
    sheetOnes: [],
    sheetFives: [],
  },
  newSheetOne: {},
  newSheetFive: [],
}

export default function counter(state = initState, action) {
  switch (action.type) {
    case CLEAR_PARSED:
      return Object.assign({}, state, {
        parsedFiles: {
          sheetOnes: [],
          sheetFives: [],
        },
      });
    case FILES_LOADED:
      // Files parsed from main thread(async)
      const file = action.payload

      // Aggregate valid sheet ones
      const sheetOnes = file.Sheets && file.Sheets.hasOwnProperty('扬尘基础数据表（1）') ? state.parsedFiles.sheetOnes.concat([file.Sheets['扬尘基础数据表（1）']]) : []

      // Sheet one container for mutation
      const newSheetOne = {
        '合  计': {},
      }

      // Area for scanning sheet ones
      const rangeOne = {
        rows: fill(5, 27),
        columns: fill('A', 'L'),
      }

      // Scan implementation for sheet ones
      sheetOnes.forEach((sheet, sheetKey) => {
        rangeOne.columns.map((column, columnKey) => {
          rangeOne.rows.map((row, rowKey) => {
            if (sheet[column + row] && sheet[column + row].v !== '合  计') {

              if (sheet[column + row].t === 's') {
                // Initialize row names
                if (!newSheetOne.hasOwnProperty(sheet[column + row].v)) {
                  newSheetOne[sheet[column + row].v] = {}
                }
              }

              if (sheet[column + row].t === 'n') {
                // Aggregate for cells
                newSheetOne[sheet['A' + row].v][column] = newSheetOne[sheet['A' + row].v][column] ?
                  newSheetOne[sheet['A' + row].v][column] + sheet[column + row].v : sheet[column + row].v

                // Aggregate for summary
                newSheetOne['合  计'][column] = newSheetOne['合  计'][column] ?
                  newSheetOne['合  计'][column] + sheet[column + row].v : sheet[column + row].v
              }
            }
          })
        })
      })

      // Make sure Summary always at bottom
      const sum = Object.assign({}, newSheetOne['合  计'])
      delete newSheetOne['合  计']
      newSheetOne['合  计'] = sum

      // Aggregate valid sheet fives
      const sheetFives = file.Sheets && file.Sheets.hasOwnProperty('扬尘基础数据（5）') ? state.parsedFiles.sheetFives.concat([file.Sheets['扬尘基础数据（5）']]) : []


      // Sheet five container for mutation
      const newSheetFive = []


      // Area for scanning sheet fives
      const rangeFive = {
        rows: fill(4, 13),
        columns: fill('B', 'H'),
      }

      // Scan implementation for sheet fives
      sheetFives.forEach((sheet, sheetKey) => {
        const record = {}

        rangeFive.columns.map((column, columnKey) => {
          rangeFive.rows.map((row, rowKey) => {
            if (sheet[column + row] && (sheet[column + row].v != 0)) {
              record[row] = Object.assign({}, record[row], {
                [column]: sheet[column + row].v
              })
            }
          })
        })

        Object.keys(record).map((key) => {
          newSheetFive.push(record[key])
        })
      })

      return Object.assign({}, state, {
        parsedFiles: { sheetOnes, sheetFives },
        newSheetOne: newSheetOne,
        newSheetFive: newSheetFive,
        loading: false,
      });
    case WRITE_FILE:
      return state
    default:
      return state;
  }
}
