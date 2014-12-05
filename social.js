// Object constructor
function Social(social, parameter, actor) {
    this.social = social;
    this.parameter = parameter;
    this.actor = actor;
}

Social.prototype.format = function(message) {
    return message.replace('PLAYER_NAME', this.actor.name)
        .replace('PLAYER_PRONOUN_POSSESSIVE', this.actor.getPossessivePronoun())
        .replace('PLAYER_PRONOUN_OBJECT', this.actor.getObjectPronoun())
        .replace('PLAYER_PRONOUN_SUBJECT', this.actor.getPersonalPronoun());
};

Social.prototype.emitMessages = function() {
    if (this.parameter === '') {
        this.emitSocialWithoutVictim();
    }
    else if(this.parameter === this.actor.name) {
        this.emitSocialWhenSelfIsVictim();
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

Social.prototype.emitSocialMessageToActor = function(message) {
    if (this.actor.socket !== undefined) {
        this.actor.socket.emit('message', { message: message });
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

// Exports
module.exports = Social;