// import { parseISO, formatDistanceToNow } from "date-fns";

// interface TimeProps {
//     timestamp: string,
// }

// const TimeAgo = ({timestamp}: TimeProps) => {
//     let timeAgo = '';
//     if (timestamp) {
//         const date = parseISO(timestamp)
//         const timePeriod = formatDistanceToNow(date)
//         timeAgo = `${timePeriod} ago`
//     }

//     return (
//         <span title={timestamp}>
//             &nbsp; <i>{timeAgo}</i>
//         </span>
//     )
// }

// export default TimeAgo;

import { parseISO, formatDistanceToNow } from 'date-fns';

interface TimeAgoProps {
    timestamp: string,
}

const TimeAgo = ({ timestamp }: TimeAgoProps) => {
    let timeAgo = ''
    if (timestamp) {
        const date = parseISO(timestamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }

    return (
        <span title={timestamp}>
            &nbsp; <i>{timeAgo}</i>
        </span>
    )
}
export default TimeAgo