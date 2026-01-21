export const CsvTable = ({ data }: {data: Array<string>}) => (
    <table>
      <thead>
      <tr>
        {Object.keys(data[0]).map(h => <th key={h}>{h}</th>)}
      </tr>
      </thead>
      <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          {Object.values(row).map((cell, j) => (
            <td key={j}>{cell}</td>
          ))}
        </tr>
      ))}
      </tbody>
    </table>
  )
