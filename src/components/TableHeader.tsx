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
                style={{
                  minWidth: index===0 ? '40px' : index===elements.length? '65px' : 'auto',
                  width: index===0 ? '20%' : index===elements.length? '20%' : '60%'
                }}
              >{element}
              </th>
            )
          })}
        </tr>
      </thead>
    )
  }
  

  export {}