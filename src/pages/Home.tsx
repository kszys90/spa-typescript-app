import React, { ChangeEvent } from 'react'
import { useAsyncFn } from 'react-use'
import { getData } from '../api/getData'


export const Home = () => {
    const perPageLimit : number = 5
    const apiURL = 'https://reqres.in/api/products'
    
    interface ApiRequest {
        url: string
        perPage: number
        page?: number
        filter?: number
    }

    const [inputVal, setInputVal] = React.useState('')
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isNaN(Number(e.target.value))) {
            setInputVal(e.target.value)
        }
    }
    function handleFormSubmit (e: React.SyntheticEvent) {
        e.preventDefault()
        console.log(inputVal)
        // setSearch({ ...search, search: inputVal })
    }
    const [state, doFetch] = useAsyncFn((call :ApiRequest) =>getData(call))
    function renderTable(){
        console.log(state)
        return (
            <div>123</div>
        )
    }

    
    React.useEffect(() => {
        doFetch({url: apiURL, perPage: perPageLimit})
      }, [doFetch])
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
                        <>
                            <h2 className={'error--message'}>Error: {state.error.message}</h2>
                            <h4 className={'error--message'}>Sorry, we are unable to access the database. Please refresh or try again later</h4>
                        </>
                    : 
                        !state.value ?
                            <div>No data...</div>
                            :
                            typeof(state)!=='object'? null : renderTable()
                            }
            </div>
    </div>
  )
}

export {}