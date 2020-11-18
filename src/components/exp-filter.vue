<template>
<section class="exp-filter">
    <button class="filter-btn" :class="isOnType" @click="setOption('type')">Type</button>
    <button class="filter-btn" :class="isOnLocation" @click="setOption('location')">Country</button>
    <button class="filter-btn" :class="isOnTags" @click="setOption('tags')">More filters</button>
    <button class="filter-btn" :class="isOnSortBy" @click="setOption('sortBy')">sort</button>
    <div v-show="filterOption" @click="close" class="screen"></div>

    <div v-show="(filterOption === 'type')" class="type-filter filter-modal">
        <h2>Select experience</h2>
        <div class="label-container">
            <div v-for="filterType in types" :key="filterType.id">
                <input :id="filterType.id" type="radio" v-model="filterBy.type" :value="filterType.id" hidden>
                <label :for="filterType.id">{{filterType.txt}}</label>
            </div>
        </div>
        <button class="save-filter-btn" @click="save">save</button>
    </div>

    <div v-show="(filterOption === 'location')" class="location-filter filter-modal">
        <h2>Select locatin</h2>
        <div class="label-container">
            <div v-for="location in locations" :key="location.id">
                <input :id="location.id" type="radio" v-model="filterBy.location" :value="location.id" hidden>
                <label :for="location.id">{{location.txt}}</label>
            </div>
        </div>
        <button class="save-filter-btn" @click="save">save</button>
    </div>

    <div v-show="(filterOption === 'tags')" class="more-filter filter-modal">
        <h2>Continent</h2>
        <div class="label-container">
            <div v-for="tag in tags1" :key="tag.id">
                <input :id="tag.id" type="checkbox" @change="choose" :value="tag.id" hidden>
                <label :for="tag.id">{{tag.txt}}</label>
            </div>
        </div>
        <h2 class="seasons-filter">Seasons</h2>
        <div class="label-container">
            <div v-for="tag in tags2" :key="tag.id">
                <input :id="tag.id" type="checkbox" @change="choose" :value="tag.id" hidden>
                <label :for="tag.id">{{tag.txt}}</label>
            </div>
        </div>
        <h2 class="more-filters">More filters</h2>
        <div class="label-container">
            <div v-for="tag in tags3" :key="tag.id">
                <input :id="tag.id" type="checkbox" @change="choose" :value="tag.id" hidden>
                <label :for="tag.id">{{tag.txt}}</label>
            </div>
        </div>
        <button class="save-filter-btn" @click="save">save</button>
    </div>

    <div v-show="(filterOption === 'sortBy')" class="sortBy-filter filter-modal">
        <h2>Sort</h2>
        <div class="label-container">
            <div v-for="sort in sortBy" :key="sort.id">
                <input :id="sort.id" type="radio" v-model="filterBy.sortBy" :value="sort.id" hidden>
                <label :for="sort.id">{{sort.txt}}</label>
            </div>
        </div>
        <button class="save-filter-btn" @click="save">save</button>
    </div>

</section>
</template>

<script>
export default {
    name: "exp-filter",
    data() {
        return {
            types: [{
                    id: 'all-type',
                    txt: 'All'
                },
                {
                    id: 'Bungee',
                    txt: 'Bungee'
                },
                {
                    id: 'Diving',
                    txt: 'Diving'
                },
                {
                    id: 'Ski',
                    txt: 'Ski'
                },
                {
                    id: 'Motorcross',
                    txt: 'Motorcross'
                },
                {
                    id: 'Offroad',
                    txt: 'Offroad'
                },
                {
                    id: 'Rappelling',
                    txt: 'Rappelling'
                },
                {
                    id: 'Rock-climb',
                    txt: 'Rock Climb'
                },
                {
                    id: 'Skydiving',
                    txt: 'Skydiving'
                },
                {
                    id: 'Surffing',
                    txt: 'Surffing'
                }
            ],
            locations: [{
                    id: 'all-location',
                    txt: 'All'
                },
                {
                    id: 'Bulgaria',
                    txt: 'Bulgaria'
                },
                {
                    id: 'Egypt',
                    txt: 'Egypt'
                },
                {
                    id: 'France',
                    txt: 'France'
                },
                {
                    id: 'Hawaii',
                    txt: 'Hawaii'
                },
                {
                    id: 'Israel',
                    txt: 'Israel'
                },
                {
                    id: 'Italy',
                    txt: 'Italy'
                },
                {
                    id: 'South Africa',
                    txt: 'South Africa'
                },
                {
                    id: 'Switzerland',
                    txt: 'Switzerland'
                },
                {
                    id: 'Thailand',
                    txt: 'Thailand'
                },
                {
                    id: 'USA',
                    txt: 'USA'
                }
            ],
            tags1: [{
                    id: 'Africa',
                    txt: 'Africa'
                },
                {
                    id: 'America',
                    txt: 'America'
                },
                {
                    id: 'Asia',
                    txt: 'Asia'
                },
                {
                    id: 'Europe',
                    txt: 'Europe'
                },
            ],
            tags2: [{
                    id: 'All-year ',
                    txt: 'All year '
                },
                {
                    id: 'Summer',
                    txt: 'Summer'
                },
                {
                    id: 'Winter',
                    txt: 'Winter'
                },
            ],
            tags3: [{
                    id: 'Adventure',
                    txt: 'Adventure'
                },
                {
                    id: 'Adults',
                    txt: 'Adults'
                },
                {
                    id: 'All-levels',
                    txt: 'All levels'
                },
                {
                    id: 'Animals',
                    txt: 'Animals'
                },
                {
                    id: 'Children',
                    txt: 'Children'
                },
                {
                    id: 'Danger',
                    txt: 'Danger'
                },
                {
                    id: 'Desert',
                    txt: 'Desert'
                },
                {
                    id: 'Expert',
                    txt: 'Expert'
                },
                {
                    id: 'Family',
                    txt: 'Family'
                },
                {
                    id: 'Loud',
                    txt: 'Loud'
                },
                {
                    id: 'Ropes',
                    txt: 'Ropes'
                },
                {
                    id: 'Sports',
                    txt: 'Sports'
                },
                {
                    id: 'Sun',
                    txt: 'Sun'
                },
                {
                    id: 'View',
                    txt: 'View'
                },
                {
                    id: 'Water',
                    txt: 'Water'
                },
            ],
            sortBy: [{
                    id: 'newest',
                    txt: 'Date'
                },
                {
                    id: 'currPrice',
                    txt: 'Price'
                },
            ],
            filterOption: '',
            filterBy: {
                type: 'all-type',
                location: 'all-location',
                tags: [],
                sortBy: 'newest',
            }
        }
    },
    computed: {
        isOnType() {
            return {
                isActive: this.filterOption === 'type'
            }
        },
        isOnLocation() {
            return {
                isActive: this.filterOption === 'location'
            }
        },
        isOnTags() {
            return {
                isActive: this.filterOption === 'tags'
            }
        },
        isOnSortBy() {
            return {
                isActive: this.filterOption === 'sortBy'
            }
        },
    },
    methods: {
        setOption(option) {
            if (this.filterOption === option) {
                return this.filterOption = '';
            }
            if (option === 'type') this.filterOption = 'type';
            if (option === 'location') this.filterOption = 'location';
            if (option === 'tags') this.filterOption = 'tags';
            if (option === 'sortBy') this.filterOption = 'sortBy';
        },
        close() {
            this.filterOption = ''
        },
        save() {
            this.filterOption = '';
            this.$emit('setFilter', this.filterBy);
            this.filterBy = JSON.parse(JSON.stringify(this.filterBy));
        },
        choose(ev) {
            if (ev.target.checked) {
                this.filterBy.tags.push(ev.target.labels[0].innerText)
            } else {
                const idx = this.filterBy.tags.findIndex(tag => tag === ev.target.labels[0].innerText);
                this.filterBy.tags.splice(idx, 1)
            }
        }
    },
}
</script>
