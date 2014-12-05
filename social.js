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
};

Social.prototype.emitSocialWithoutVictim = function() {
    if (this.actor.socket !== undefined) {
        this.actor.socket.emit('message', {
            message: this.format(this.social.toPlayer_NoVictimSpecified)
        });
    }

    if (this.social.toRoom_NoVictimSpecified !== "#") {
        var formattedSocial = this.format(this.social.toRoom_NoVictimSpecified);

        for (var i = 0; i < this.actor.room.people.length; i++) {
            var messageTarget = this.actor.room.people[i];

            if (messageTarget !== this.actor) {
                if (messageTarget.socket !== undefined) {
                    messageTarget.socket.emit('message', {
                        message: formattedSocial
                    });
                }
            }
        }
    }
};

// Exports
module.exports = Social;