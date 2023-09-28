const express = require("express");
const Data = require("../data/mockData");
const UserData = require("../data/db.js")
const EmailData = require("../data/emails.db")
const server = express();

server.use(express.json());

//!get
server.get("/hobbits", async (req, res) => {
    try {
        const hobbits = await Data.getHobbits();
        res.status(200).json(hobbits)
    } catch (err) {
        res.status(500).json({ message: "Error fetching hobbits " + err.message })
    }
})
//!get


//!getbyid 
server.get("/hobbits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hobbitById = await Data.getById(id);
        if (!hobbitById) {
            res.status(404).json({ message: `hobbit with id : ${id} does not exist` })
        } else {
            res.status(200).json({ message: "success fetching hobbit", data: hobbitById })
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching hobbits " + err.message })
    }
})
//!getbyid 


//!post
server.post("/hobbits", async (req, res) => {
    try {
        const { name } = req.body;
        const newHobbit = await Data.createHobbit(name);
        if (!name) res.status(422).json({ message: "error creating hobbit, need name" })
        else res.status(201).json({ message: "successful creation of hobbit", data: newHobbit })
    } catch (err) {
        res.status(500).json({ message: "Error creating hobbits " + err.message })
    }
})
//!post


//!put 
server.put("/hobbits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedHobbit = await Data.updateHobbit(id, name);

        if (!name) res.status(422).json({ message: "name field is required for update request" })

        if (!updatedHobbit) res.status(404).json({ message: `id : ${id} does not exist` })

        else res.status(200).json({ message: "update was successful", data: updatedHobbit });

    } catch (err) {
        res.status(500).json({ message: "Error updating hobbits " + err.message })
    }
})
//!put 


//!delete
server.delete("/hobbits/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHobbit = await Data.deleteHobbit(id);
        if (!deletedHobbit) res.status(422).json({ message: `hobbit with id: ${id} does not exist` })
        else {
            res.status(200).json({ message: "deleting hobbit was success", data: deletedHobbit })
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting hobbits " + err.message })
    }
})
//!delete






/////!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!////////////////////
//* /* new api end points below*/ //*
///////!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/////////////////////


//!get user
server.get("/users", async (req, res) => {
    try {
        const users = await UserData.find();
        res.status(200).json({ message: `success fetching users`, data: users })
    } catch (err) {
        res.status(500).json({ message: "Error fetching users " + err.message })
    }
})
server.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const userById = await UserData.findById(id);
        if (!id) {
            res.status(404).json({ message: `need ${id} to instantiate request` });
        } else if (!userById) {
            res.status(422).json({message : `user with id: ${id} does not exist`})
        }else {
            const userById = await UserData.findById(id);
            res.status(200).json({ message: `success fetching user with id: ${id}`, data: userById })
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching users " + err.message })
    }
})
server.post("/users", async (req, res) => {
    try {
        const { name, bio } = req.body;
        if (!name || !bio) {
            res.status(422).json({ message: `error creating new user, missing ${!name ? "name" : "bio"}` })
        } else {
            const createdUser = await UserData.insert({ name, bio });
            res.status(201).json({ message: "success creating user", data: createdUser })
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching users " + err.message })
    }
})
server.put("/users/:id", async (req, res) => {
    try {
      const {id} = req.params;
      const {name,bio} = req.body;
      const updated = await UserData.update(id,{name,bio})
      if (!id) {
        res.status(404).json({message : "need id to initialize request"})
      } else if (!name || !bio) {
        res.status(422).json({message : `error updating user, missing ${!name ? "name" : "bio"}`});
      } else if (!updated) {
        res.status(422).json({message : `user with id: ${id} does not exist`})
      } else if (name && bio && updated) {
        res.status(200).json({message : "success updating user", data : updated})
      }
    } catch (err) {
        res.status(500).json({ message: "Error fetching users " + err.message })
    }
})
server.delete("/users/:id",async(req,res)=> {
    try {
        const {id} = req.params;
        if (!id) res.status(404).json({message : "need id for delete request"})
        const deletedUser = await UserData.remove(id);
        if (!deletedUser) {
            res.status(422).json({message : `user with id: ${id} does not exist`})
        } else {
            res.status(200).json({message : "success deleting user", data : deletedUser})
        }
    } catch (err) {
        res.status(500).json({ message: "Error fetching users " + err.message })
    }
})









/////!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!////////////////////
//* /* new api end points below*/ //*
///////!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/!//!//!//!//!//!//!//!//!//!//!/////////////////////

server.get("/emails",async(req,res)=> {
    try {
        const emails = await EmailData.getEmails();
        res.status(200).json({message : "success on email fetch", data : emails})
    } catch (err) {
        res.status(500).json({message : `error fetching emails ${err.message}`})
    }
})
server.put("/emails/:id",async(req,res) => {
    try {
       const {id} = req.params;
       const {email} = req.body;
       const updatedEmail = await EmailData.modifyEmail(id,email);
       if (!id) {
        res.status(404).json({message : "need to input id to instantiate request"})
       }
       if (!email) {
        res.status(422).json({message : "need email field to complete update"})
       }
       if (!updatedEmail) {
        res.status(404).json({message : `email with id: ${id} not found`})
       } else {
        res.status(200).json({message : "success on update", data : updatedEmail})
       }
    } catch(err) {
        res.status(500).json({message : `error fetching email ${err.message}`})
    }
})



module.exports = server;

