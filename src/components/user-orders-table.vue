<template>
<div class="activities-list-container">
    <h3 class="activities-list-header">Activities:</h3>
    <table class="user-activity-table">
        <thead class="user-activity-thead">
            <tr class="user-activity-tr">
                <th colspan="2">Name</th>
                <th>Experience Date</th>
                <th>Number of Participants</th>
                <th>Price/Person</th>
                <th>Total Income</th>
                <th>Order Date</th>
            </tr>
        </thead>
        <tbody v-if="participantsTable">
            <tr class="user-activity-tr" v-for="participant in participantsTable" :key="participant.createdAt">
                <td class="img-cell">
                    <img class="participant-img" :src="participant.imgUrl" alt />
                </td>
                <td>{{ participant.fullName }}</td>
                <td class="center">
                    {{ participant.expDate | moment("DD/MM/YYYY") }}
                </td>
                <td class="center">{{ participant.numOfTickets }}</td>
                <td class="center">{{ participant.currPrice }}</td>
                <td class="center">
                    {{participant.numOfTickets * participant.currPrice}}
                </td>
                <td class="center">
                    {{ participant.createdAt | moment("DD/MM/YYYY, h:mm:ss a")  }}
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    name: "user-orders-table",
    props: ['exps'],
    data() {
        return {
            participantsTable: []
        }
    },
    created() {
        this.exps.forEach((exp) => {
            exp.participants.forEach((participant) => {
                participant.expDate = exp.date;
                participant.currPrice = exp.currPrice;
                this.participantsTable.push(participant);
            });
        });
        this.participantsTable.sort((a, b) => {
            return a.expDate - b.expDate;
        });
    }
}
</script>
