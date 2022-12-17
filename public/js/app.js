const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value

    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error)
            {
                console.log(data.error)
                message1.textContent = data.error
            }
            else
            {
                console.log(data)
                message1.textContent = data.weatherdata.temperature
            }
        })
    })
})