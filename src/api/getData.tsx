interface ApiRequest {
    url: string
    perPage: number
    page?: number
    filter?: number
}

export const getData = (request : ApiRequest) => {
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
            const filter = request.filter
            return filter}
        const filter=''
        return filter
    }
    function setApiUrl (url: string, perPage: number, page:number, filter?:number | string){
        if (typeof(filter) === 'number'){
            const requestUrl = `${url}/${filter}`
            console.log(requestUrl)
            return requestUrl
        }
        const requestUrl = `${url}?per_page=${perPage}&page=${page}`
        console.log(requestUrl)
        return requestUrl
    }

    return fetch(setApiUrl(url,perPage,setPage(),setFilter()))
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        }
        throw new Error('Network Error!')
      })
      .catch(error => {
        throw (error)
      })
  }

export {}