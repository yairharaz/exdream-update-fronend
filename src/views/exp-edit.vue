<template>
    <section class="exp-edit" v-if="expToEdit">
        <h1>{{ (expToEdit._id) ? 'Edit Experience' : 'Add Experience' }}</h1>
        <form class="form-edit-add" @submit.prevent="saveExp">
            <label>
                Event Date:
                <date-picker  @setDay="setDay" :date="expToEdit.date" />
            </label>
            <label>
                Location:
                <el-input
                    class="el-input "
                    required
                    placeholder="Experience location"
                    v-model="expToEdit.location"
                ></el-input>
            </label>
            <label>
                Title:
                <el-input
                    class="el-input"
                    required
                    placeholder="Experience title"
                    v-model="expToEdit.title"
                ></el-input>
            </label>
            <label>
                Type:
                <el-select
                    class="selector-type "
                    required
                    v-model="expToEdit.type"
                    placeholder="Choose Experience type">
                    <el-option v-for="option in options1" :key="option" :value="option">{{option}}</el-option>
                </el-select>
            </label>
            <label>
                Upload/Have at least 5 images:
                <p>{{loaded}}</p>
                <input
                    class="input-img "
                    :required="isNotEnoughImg"
                    type="file"
                    placeholder="Experience image"
                    @change="onUploadImg"
                />
            </label>
            <div class="exp-edit-imgs-container">
                <div class="exp-edit-imgs" v-for="(img, idx) in expToEdit.imgUrls" :key="idx">
                    <img :src="img" style="height: 50px; width: 50px;" />
                    <button @click.prevent="deleteImg(idx)">
                        <i class="el-icon-delete"></i>
                    </button>
                </div>
            </div>
            <el-input
                class="el-input-textarea "
                required
                type="textarea"
                :rows="2"
                placeholder="Please input short description"
                v-model="expToEdit.shortDesc"
            ></el-input>
            <el-input
                class="el-input-textarea "
                required
                type="textarea"
                :rows="2"
                placeholder="Please input long description"
                v-model="expToEdit.desc"
            ></el-input>
            <label>
                Max participants:
                <el-input-number
                    class="el-input-capacity "
                    required
                    controls-position="right"
                    :min="1"
                    v-model="expToEdit.capacity"
                ></el-input-number>
            </label>
            <label>
                Category:
                <el-select
                    class="multi-selector"
                    multiple
                    v-model="value1"
                    placeholder="Choose Category"> 
                     <el-option v-for="option in options2" :key="option" :value="option">{{option}}</el-option>
                </el-select>
            </label>
            <label>
                Price:
                <el-input-number
                    class="input-price "
                    v-model="expToEdit.origPrice"
                    controls-position="right"
                    :min="0"
                    placeholder="origPrice"
                ></el-input-number>
            </label>
            <label>
                Price with discount:
                <el-input-number
                    class="input-price "
                    v-model="expToEdit.currPrice"
                    controls-position="right"
                    :min="0"
                    placeholder="currPrice"
                ></el-input-number>
            </label>
        <div class="btn-container">
            <button
                type="button"
                @click="back"
                class="btn-back">
                &laquo; Back </button>
            <button class="delete-exp" v-if="expToEdit._id" @click="removeExp">Delete</button>
            <button class="btn-save" :disabled="disabled">Save</button>
        </div>
        </form>
    </section>
</template>

<script>
import { uploadImg } from "../services/imgUpload.service";
import { expService } from "../services/exp.service.js";
import datePicker from "../components/date-picker";

export default {
    data() {
        return {
            loggedinUser: null,
            disabled: true,
            loaded: "",
            loadCount: 0,
            expToEdit: null,
            options1: ['Ski','Diving' , 'Rock-Climb' ,'Surffing' ,'Bunjee' ,'Sky Diving', 'Motorcross' ,'Snapling' ,'Offroad'],
            options2:['Family','Children','All level','Adventure','Sports','Adults','Europe','Expert','Africa','Asia','Water','Danger','Ropes','View','Sun','Animals','Winter','All-year','Loud','Desert'],
            value1: [],
        };
    },

    computed: {
        isNotEnoughImg() {
            return this.expToEdit.imgUrls < 5;
        },
    },
    methods: {
        back(){
            (window.history.length > 2)? this.$router.go(-1) : this.$router.push('/')
        },
      
        async loadExp() {
            let expId = this.$route.params.id;
            if (expId) {
                const exp = await expService.getById(expId);
                this.expToEdit = JSON.parse(JSON.stringify(exp));
                this.expToEdit.tags.forEach((element) => {
                    this.value1.push(element);
                });
            } else {
                this.expToEdit = expService.getEmptyExp();
            }
        },
        setDay(day) {
            if (day !== null || this.expToEdit.date !== null)
                this.disabled = false;
            this.expToEdit.date = day;
        },
        async saveExp() {
            if (!this.expToEdit.title) return;
            if (!this.expToEdit._id) {
                this.expToEdit.createdBy._id = this.loggedinUser._id;
                this.expToEdit.createdBy.fullName = this.loggedinUser.fullName;
                this.expToEdit.createdBy.imgUrl = this.loggedinUser.imgUrl;
                this.expToEdit.createdBy.info = this.loggedinUser.info;
            }
            this.expToEdit.tags = this.value1;
            await this.$store.dispatch({
                type: "saveExp",
                exp: this.expToEdit,
            });
            this.$router.push("/");
            this.loadExp();
        },
        async removeExp() {
            const savedExp = await this.$store.dispatch({
                type: "removeExp",
                id: this.expToEdit._id,
            });
            this.$router.push("/");
            this.loadExp();
        },
        deleteImg(idx) {
            this.expToEdit.imgUrls.splice(idx, 1);
        },
        async onUploadImg(ev) {
            if (this.expToEdit.imgUrls.length >= 30) return;
            var res = await uploadImg(ev);
            this.expToEdit.imgUrls.push(res.url);
            if (this.loadCount === 0) {
                this.loaded = "1 image was loaded";
                this.loadCount++;
            } else {
                this.loadCount++;
                this.loaded = this.loadCount + " images were loaded";
            }
            return this.expToEdit.imgUrls;
        },
    },
    created() {
        this.loadExp();
        this.loggedinUser = this.$store.getters.loggedinUser;
    },
    watch: {
        "$route.params.expId"() {
            this.loadExp();
        },
    },
    components: {
        datePicker,
    },
};
</script>
