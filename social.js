// Object constructor
function Social(social, parameter, actor) {
    this.social = social;
    this.parameter = parameter;
    this.actor = actor;
}

Social.prototype.format = function(message) {
    var returnMessage = message.replace('PLAYER_NAME', this.actor.name)
        .replace('PLAYER_PRONOUN_POSSESSIVE', this.actor.getPossessivePronoun())
        .replace('PLAYER_PRONOUN_OBJECT', this.actor.getObjectPronoun())
        .replace('PLAYER_PRONOUN_SUBJECT', this.actor.getPersonalPronoun());
        
        if(this.victim !== undefined) {
            returnMessage = returnMessage.replace('VICTIM_NAME', this.victim.name)
                .replace('VICTIM_PRONOUN_POSSESSIVE', this.victim.getPossessivePronoun())
                .replace('VICTIM_PRONOUN_OBJECT', this.victim.getObjectPronoun())
                .replace('VICTIM_PRONOUN_SUBJECT', this.victim.getPersonalPronoun());
        }

    return returnMessage;
};

Social.prototype.emitMessages = function() {
    if (this.parameter === '') {
        this.emitSocialWithoutVictim();
    }
    else if(this.social.toPlayer_VictimFound === '') {
        this.emitSocialWithoutVictim();
    }
    else {
        var target = this.actor.room.getCharacter(this.parameter);
        
        if(target === null) {
            this.emitSocialMessageToActor(this.social.toPlayer_VictimNotFound);
        }
        else if(target === this.actor) {
            this.emitSocialWhenSelfIsVictim();
        }
        else {
            this.victim = target;
            this.emitSocialToActorVictimRoom();
        }
    }
};

Social.prototype.emitSocialWithoutVictim = function() {
    this.emitSocialMessageToActor(this.format(this.social.toPlayer_NoVictimSpecified));

    if (this.social.toRoom_NoVictimSpecified !== "#") {
        var formattedSocial = this.format(this.social.toRoom_NoVictimSpecified);
        this.emitSocialMessageToRoom(formattedSocial);
    }
};

Social.prototype.emitSocialWhenSelfIsVictim = function() {
    this.emitSocialMessageToActor(this.format(this.social.toPlayer_VictimIsSelf));

    if (this.social.toRoom_VictimIsSelf !== "#") {
        var formattedSocial = this.format(this.social.toRoom_VictimIsSelf);
        this.emitSocialMessageToRoom(formattedSocial);
    }
};

Social.prototype.emitSocialToActorVictimRoom = function() {
    this.emitSocialMessageToActor(this.format(this.social.toPlayer_VictimFound));
    this.emitSocialMessageToVictim(this.format(this.social.toVictim_VictimFound));
    this.emitSocialMessageToRoomExceptVictim(this.format(this.social.toRoom_VictimFound));
};

Social.prototype.emitSocialMessageToActor = function(message) {
    if (this.actor.socket !== undefined) {
        this.actor.socket.emit('message', { message: message });
    }
};

Social.prototype.emitSocialMessageToVictim = function(message) {
    if(this.victim !== undefined) {
        if (this.victim.socket !== undefined) {
            this.victim.socket.emit('message', { message: message });
        }
    }
};

Social.prototype.emitSocialMessageToRoom = function(message) {
    for (var i = 0; i < this.actor.room.people.length; i++) {
        var messageTarget = this.actor.room.people[i];

        if (messageTarget !== this.actor) {
            if (messageTarget.socket !== undefined) {
                messageTarget.socket.emit('message', { message: message });
            }
        }
    }
};

Social.prototype.emitSocialMessageToRoomExceptVictim = function(message) {
    for (var i = 0; i < this.actor.room.people.length; i++) {
        var messageTarget = this.actor.room.people[i];

        if (messageTarget !== this.actor && messageTarget != this.victim) {
            if (messageTarget.socket !== undefined) {
                messageTarget.socket.emit('message', { message: message });
            }
        }
    }
};

// Exports
module.exports = Social;