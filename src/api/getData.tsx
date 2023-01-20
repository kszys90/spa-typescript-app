import { RequestValidator } from "../components/RequestValidator"

export const getData = (request : RequestValidator) => {
    const {url, perPage} = request
    function setPage(){
        if (request.page){
            const page = request.page
            return page
        }
        const page = 1
        return page
    }
    function setFilter(){
        if (request.filter){
            const filter = Number(request.filter)
            return filter}
        const filter=''
        return filter
    }
    function setApiUrl (url: string, perPage: number, page:number, filter?:number | string){
        if (typeof(filter) === 'number'){
            if (!isNaN(filter)){
              const requestUrl = `${url}/${filter}`
              return requestUrl
            }
        }
        const requestUrl = `${url}?per_page=${perPage}&page=${page}`
        return requestUrl
    }

    return fetch(setApiUrl(url,perPage,setPage(),setFilter()))
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        throw new Error(`${resp.status}`)
      })
      .catch(error => {
        throw (error)
      })
  }

export {}