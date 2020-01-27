import {
    FETCH_MATCHES,
    ADD_MATCH,
    SORT_MATCHES
} from '../actions/matches'

export default (matches = [], action) => {
    switch (action.type) {
        case FETCH_MATCHES:
            return action.matches;

        case ADD_MATCH:
            return [ action.match, ...matches ];

        case SORT_MATCHES: {
            const { message, count } = action;

            for (let i = 0; i < matches.length; i++) {
                const dialog = matches[i];

                if (dialog.id === message.dialog_id) {
                    dialog.last_message = message.body
                    dialog.last_message_date_sent = message.date_sent
                    dialog.updated_at = message.date_sent
                    if (count) dialog.unread_messages_count += 1
                    matches.unshift(matches.splice(i, 1)[0])
                    break
                }
            }

            return [ ...matches ]
        }



        default:
            return matches
    }
}