import { Pagination } from '@mui/material'
import React, { ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAsyncFn } from 'react-use'
import { getData } from '../api/getData'
import { ErrorMessage } from '../components/ErrorMessage'
import { Table } from '../components/Table'
import { TableHeader } from '../components/TableHeader'
import { TableRow } from '../components/TableRow'
import {RequestValidator} from '../components/RequestValidator'


export const Home = () => {
    // API Requests config
    const perPageLimit : number = 5
    const apiURL = 'https://reqres.in/api/products'
    interface ApiItemResult {        
        id: string
        name: string
        year: number
        color: string
        pantone_value: string
    }

    // Initial API request (with fliter and page cases)
    const [state, doFetch] = useAsyncFn((req :RequestValidator) =>getData(req))
    const [search, setSearch] = useSearchParams()
    React.useEffect(() => {
        if (typeof(search.get('search')) === 'string'){
            const filterValue = search.get('search') 
            if (search.get('page') && typeof(search.get('page')) === 'string'){
                let pageNo = search.get('page') 
                    doFetch({url: apiURL, perPage: perPageLimit, page: Number(setSearchValue(pageNo)), filter: setSearchValue(filterValue)})
                    return
            }
            doFetch({url: apiURL, perPage: perPageLimit, filter: setSearchValue(filterValue)})
            return
        }
        if (search.get('page') && typeof(search.get('page')) === 'string'){
            let pageNo = search.get('page') 
                doFetch({url: apiURL, perPage: perPageLimit, page: Number(setSearchValue(pageNo))})
                return
        }
        else {doFetch({url: apiURL, perPage: perPageLimit})}
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [doFetch])
      
      function setSearchValue(element: string | null) {
        if (typeof element === "string") {
          return element
        }
        return ''
      }
      
    //   Form and input handling
    const [inputVal, setInputVal] = React.useState('')
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value))) {
            setInputVal(e.target.value)
        }
    }
    function handleFormSubmit (e: React.SyntheticEvent) {
        e.preventDefault()
        setSearch({ ...search, search: inputVal })
        if (inputVal===''){ 
            doFetch({url: apiURL, perPage: perPageLimit})
        }
        else {
            doFetch({url: apiURL, perPage: perPageLimit, filter: inputVal})
        }
    }   

    // Pagination return
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearch({ ...search, page: `${value}` })
        doFetch({url: apiURL, perPage: perPageLimit, page: value})
    }

    // App render
    return (
        <div
            className={'background'}
        >
            <header
                className={'header'}
            >
                <div>
                    <h1
                        className={'header__title'}
                        data-testid={'header-title'}
                    >
                        <span className={'header__title--modified'}>Search</span> Items
                    </h1>
                    <h4
                        className={'header__sub-title'}
                        data-testid={'header-title__desc'}
                    >
                        Type <span className={'header__sub-title--modified'}>Id</span> and find Your Item!
                    </h4>
                </div>
            </header>
            <div className={'search-tools__container'}>
                <form
                    onSubmit={(e) => handleFormSubmit(e)}
                    id={'search-form'}
                    data-testid={'search-form'}
                >
                    <label htmlFor={'search'}>
                        <input
                        data-testid={'search-form-input'}
                        type={'text'}
                        name={'search'}
                        className={'search-tools__input'}
                        placeholder={'Type number'}
                        value={inputVal}
                        onChange={(e) => handleInputChange(e)}
                        autoFocus
                        />
                    </label>
                    <button
                        data-testid={'search-form-button'}
                        type={'submit'}
                        className={'search-tools__button'}
                        form={'search-form'}
                    >Search
                    </button>
                </form>
            </div>
            <div className={'content__container'}>
                {state.loading ?
                 <div>Loading...</div> 
                 :
                    state.error ?
                        <ErrorMessage status={state.error.message} />
                    : 
                        !state.value ?
                            <div>No data...</div>
                            :
                            typeof(state)!=='object'? 
                                null 
                                : 
                                <>
                                    <div className={'content__table--container'}>
                                        <Table cn={'content__table'}>
                                            <TableHeader
                                            cn={'content__table--head'}
                                            elementsCn={'content__table--th'}
                                            elements={['ID:', 'NAME:', 'YEAR:']}
                                            />
                                            <tbody>
                                            {!state.value.data ?
                                                <tr><td></td><td>No data</td></tr>
                                                :
                                                Array.isArray(state.value.data) ?
                                                state.value.data.map(
                                                    (item:ApiItemResult) => {
                                                        return (
                                                            <TableRow
                                                            key={item.id}
                                                            item={item}
                                                            cn={'content__table--td'}
                                                            />
                                                            )
                                                        })
                                                        :
                                                        typeof(state.value.data)==='object'?
                                                        <TableRow
                                                        key={state.value.data.id}
                                                                item={state.value.data}
                                                                cn={'content__table--td'}
                                                            />
                                                            :
                                                            <tr><td></td><td>Something went wrong...</td></tr>
                                                        }
                                            </tbody>
                                        </Table>
                                    </div>
                                    <div className={'content__nav--container'}>
                                        <Pagination 
                                            color={'primary'}
                                            count={state.value.total_pages | 1}
                                            page={(typeof(search.get('page')) === 'string') ? Number(search.get('page')) : 1}
                                            onChange={handlePageChange}
                                        />
                                    </div>
                                </>
                    }
            </div>
    </div>
  )
}

export {}