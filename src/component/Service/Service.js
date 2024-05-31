export const getData = ()=>{
    let employeesData = JSON.parse(localStorage.getItem("myEmployeeData"))
    if (!employeesData) {
        return []
    }
    return employeesData
}