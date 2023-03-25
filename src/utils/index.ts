const getNameByUrl=(url: string)=>{
    if(!url) return '';
    const file = url.split('/')
    const name = file[file.length - 1]
    return name
}

export default{
    getNameByUrl
}