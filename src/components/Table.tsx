type Props = {
    cn: string,
    children: JSX.Element[],
}

export const Table: React.FC<Props> = ({
    cn,
    children,
  }) => {
    return (
      <table className={cn}>
        {children}
      </table>
    )
  }
  

export {}