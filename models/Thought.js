const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 300
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            return date.toLocalDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
}
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
