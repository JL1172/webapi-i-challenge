let id = 0;

const genId = () => {
    return id++
}

const emailArray = [
    { id: genId(), email: "john.doe@example.com" },
    { id: genId(), email: "jane.smith@example.com" },
    { id: genId(), email: "alice.jones@example.com" },
    { id: genId(), email: "bob.wilson@example.com" },
    { id: genId(), email: "emma.brown@example.com" }
  ];

module.exports = {
    async getEmails() {
        return emailArray;
    },
    async modifyEmail(id,modifiedEmail) {
        let found = emailArray.find(n => n.id == +id);
        if (!found) return null;
        const updatedEmail = {id : Number(id), email : modifiedEmail};
        let newEmailList = emailArray.map((n,i) => {
            if (n.id == +id) {
                return i;
            }
        })
        const filteredOut = newEmailList.filter(n => n)
        emailArray.splice(filteredOut[0],1,updatedEmail)
        return emailArray;
    }
    
}