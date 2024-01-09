const express=require("express")
const mongoose=require("mongoose")

const app=express()
const router=express.Router()

app.use(express.json())
app.use(express.urlencoded({extended: true }))
app.use(express.static('public'))


const connectToDatabase = async()=>{
try {
    await mongoose.connect('mongodb://localhost:27017/Database')

    console.log("Connected to Database")
} catch (error) {
    console.error("Error in Connecting to Database:", error)
}
}
connectToDatabase()


router.post("/sign_up",async (req,res)=> {
    var name=req.body.name
    var age=req.body.age
    var email=req.body.email
    var phno=req.body.phno
    var gender=req.body.gender
    var password=req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password,
        }
        
    

    try {
        const collection = await mongoose.collection.connection('user').insertOne(data)
        console.log("Record Inserted Successfully")
        res.redirect('signup_successful.html')
    } catch (err) {
        console.error("Error in form submission:",err)
        res.status(500).send("Internal Server Error")
        
    }
})

app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":'*'
    })
    return res.redirect('index.html')
})
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})