type Props = {
    cn: string,
    elementsCn: string
    elements: string[]
}

export const TableHeader:React.FC<Props> = ({ cn, elementsCn, elements }) => {
  
    return (
  
      <thead className={cn}>
        <tr>
          {elements.map((element, index) => {
            return (
              <th
                key={`table-header-${index}`}
                className={elementsCn}
              >{element}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
  

  export {}