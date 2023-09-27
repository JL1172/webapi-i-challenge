let id = 0
let getId = () => ++id // helper function to create auto-incrementing ids

let hobbits = [ // our fake hobbits database table
  { id: getId(), name: 'Samwise Gamgee' },
  { id: getId(), name: 'Frodo Baggins' },
];

module.exports = {
    async getHobbits() {
        return hobbits;
    },
    async getById(id) {
        let found = hobbits.find(n => n.id == id);
        if (!found) return null;
        else return found;
    },
    async createHobbit(newHobbit) {
        if (!newHobbit) return null;
        else {
            const finalizedHobbit = {id : getId(),name : newHobbit};
            hobbits.push(finalizedHobbit);
            return hobbits;
        }
    },
    async updateHobbit(idToUpdate,updatedName) {
        const found = hobbits.find(n => n.id == idToUpdate);
        if (!found) return null; //*handler for no update, sends a message like "need to update or exist for valid update"
        else {
            return hobbits.map(n => {
                if (n.id == idToUpdate) {
                    return {...n, name : updatedName}
                } else {
                    return n;
                }
            })
        }
    },
    async deleteHobbit(idToDelete) {
        const foundTest = hobbits.find(n=> n.id == idToDelete)
        const index = hobbits.map((n,i) => {
            if (n.id == +idToDelete) {
                return i;
            } else {
                return null;
            }
        });
        if (!foundTest) return null; 
        else {
        const filtered = index.filter(n => n);
            const i = filtered[0];
            hobbits.splice(i,1);
            return hobbits; 
        }
    }
}