<template>
    <el-select class="book-selector" v-model="value" placeholder="1">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
        >
        </el-option>
    </el-select>
</template>

<script>
export default {
    props: ["numberOfSoldTickets", "capacity"],
    data() {
        return {
            options: [
                {
                    value: 1,
                    label: "1",
                    disabled: false,
                },
                {
                    value: 2,
                    label: "2",
                    disabled: false,
                },
                {
                    value: 3,
                    label: "3",
                    disabled: false,
                },
                {
                    value: 4,
                    label: "4",
                    disabled: false,
                },
                {
                    value: 5,
                    label: "5",
                    disabled: false,
                },
            ],
            value: 1,
        };
    },
    methods: {
        setOptions() {
            const numberOfAvailableTickets =
                this.capacity - this.numberOfSoldTickets;
            this.options = this.options.map((option) => {
                option.disabled =
                    option.value > numberOfAvailableTickets ? true : false;
                return option;
            });
        },
    },
    created() {
        this.setOptions();
    },
    watch: {
        value() {
            this.$emit("setTicket", this.value);
        },
        participants() {
            this.setOptions();
        },
    },
};
</script>


