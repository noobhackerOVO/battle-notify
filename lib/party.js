const party = new Map()

module.exports = function PartyManager(mod, debug){
    mod.hook('S_PARTY_MEMBER_LIST', 6, processPartyList)
    mod.hook('S_LEAVE_PARTY_MEMBER', 2, (event) => {
        party.delete(event.playerId.toString())
    })
    mod.hook('S_LEAVE_PARTY', 1, (event) => {
        party.clear()
    })
    function processPartyList(event) {
        party.clear()
        event.members.forEach(member => {
            party.set(
                member.playerId.toString(),
                member.gameId.toString()
            )
        })
    }
    this.members = function(){
        return Array.from(party.values())
    }
    this.isMember = function(id){
        id = id.toString()
        return (
            Array.from(party.values()).includes(id) ||
            Array.from(party.keys()).includes(id)
        )
    }
}
