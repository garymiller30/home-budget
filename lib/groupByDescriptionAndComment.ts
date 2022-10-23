import { iTransaction } from "@/interfaces/iTransaction";

/*
{
    "zp":{
        "avans":[
            transaction,transaction,...
        ]
    }
}
 */

export default function groupByDescriptionAndComment(transactions: iTransaction[] = []) {
    const group = transactions.reduce((acc, transaction) => {
        const obj = { ...acc };
        const desc = transaction.description.toLowerCase().trim();
        const comment = transaction.comment?.toLowerCase().trim() ?? "other";

        if (!(desc in obj)) {
            const commentObj = Object.create({});

            commentObj.__proto__.getDescriptionTotal = getDescriptionTotal;
            commentObj.__proto__.isSingleItem = isSingleItem;
            commentObj.__proto__.getSingleTrans = getSingleTrans;
            //@ts-expect-error:
            obj[desc] = commentObj;

        }
        //@ts-expect-error:
        if (!(comment in obj[desc])) {
            //@ts-expect-error:
            obj[desc][comment] = []
        }
        //@ts-expect-error:
        obj[desc][comment].push(transaction);

        return obj;
    }, {})




    return group;
}


function getDescriptionTotal() {
    let total = 0;

    //@ts-expect-error:
    for (const key of Object.keys(this)) {
        //@ts-expect-error:
        total += this[key].reduce((acc, cur) => acc + Number(cur.amount), 0);
    }
    return total;

}

function getCommentTotal() {
}

function isSingleItem() {
    //@ts-expect-error:
    const keys = Object.keys(this);

    if (keys.length > 1) return false;
    //@ts-expect-error:
    if (this[keys[0]].length > 1) return false;
    return true;
}

function getSingleTrans() {
    //@ts-expect-error:
    const keys = Object.keys(this);
    //@ts-expect-error:
    const trans = this[keys[0]][0]

    return trans;
}