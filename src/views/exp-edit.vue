<template>
  <section class="exp-edit" v-if="expToEdit">
    <h1>{{ (expToEdit._id) ? 'Edit exp' : 'Add exp' }}</h1>
    <form class="form-edit-add" @submit.prevent="saveExp">
      <label>
        Event Date:
        <date-picker @setDay="setDay" :date="expToEdit.date" />
      </label>
      <label>
        Location:
        <el-input
          class="el-input"
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
        <el-select class="selector-type" required v-model="expToEdit.type" placeholder="Choose Experience type">
          <el-option value="Ski">Ski</el-option>
          <el-option value="Diving">Diving</el-option>
          <el-option value="Rock-Climb">Rock-Climb</el-option>
          <el-option value="Surffing">Surffing</el-option>
          <el-option value="Bunjee">Bunjee</el-option>
          <el-option value="Sky Diving">Sky Diving</el-option>
          <el-option value="Motorcross">Motorcross</el-option>
          <el-option value="Rappelling">Snapling</el-option>
          <el-option value="Offroad">Snapling</el-option>
        </el-select>
      </label>
      <label>
        Upload/Have at least 5 images: 
        <p>{{loaded}}</p>
        <input
          class="input-img"
          :required="isNotEnoughImg"
          type="file"
          placeholder="Experience image"
          @change="onUploadImg"
        />
      </label>
      <div class="exp-edit-imgs-container">
        <div class="exp-edit-imgs" v-for="(img, idx ) in expToEdit.imgUrls">
          <img :src="img" style="height: 50px; width: 50px;" />
          <button @click.prevent="deleteImg(idx)"><i class="el-icon-delete"></i></button>
        </div>
      </div>
      <el-input
        class="el-input-textarea"
        required
        type="textarea"
        :rows="2"
        placeholder="Please input short description"
        v-model="expToEdit.shortDesc"
      ></el-input>
      <el-input
        class="el-input-textarea"
        required
        type="textarea"
        :rows="2"
        placeholder="Please input long description"
        v-model="expToEdit.desc"
      ></el-input>
      <label>
        Capacity:
        <el-input
          class="el-input-capacity"
          required
          type="number"
          placeholder="Max participants"
          v-model="expToEdit.capacity"
        ></el-input>
      </label>
      <label>
        Category:
        <el-select class="multi-selector" multiple v-model="value1" placeholder="Choose Category">
          <el-option value="Family">Family</el-option>
          <el-option value="Children">Children</el-option>
          <el-option value="All level">All levels</el-option>
          <el-option value="Adventure">Adventure</el-option>
          <el-option value="Sports">Sports</el-option>
          <el-option value="Adults">Adults</el-option>
          <el-option value="Europe">Europe</el-option>
          <el-option value="Expert">Expert</el-option>
          <el-option value="Africa">Africa</el-option>
          <el-option value="Asia">Asia</el-option>
          <el-option value="Water">Water</el-option>
          <el-option value="Danger">Danger</el-option>
          <el-option value="Ropes">Ropes</el-option>
          <el-option value="View">View</el-option>
          <el-option value="Sun">Sun</el-option>
          <el-option value="Animals">Animals</el-option>
          <el-option value="Winter">Winter</el-option>
          <el-option value="All-year">All-year</el-option>
          <el-option value="Loud">Loud</el-option>
          <el-option value="Desert">Desert</el-option>
        </el-select>
      </label>
      <label>
        Price:
        <el-input-number
        class="input-price"
          v-model="expToEdit.origPrice"
          controls-position="right"
          :min="0"
          placeholder="origPrice"
        ></el-input-number>
      </label>
      <label>
        Price with discount:
        <el-input-number
        class="input-price"
          v-model="expToEdit.currPrice"
          controls-position="right"
          :min="0"
          placeholder="currPrice"
        ></el-input-number>
      </label>
      <button class="btn-save" :disabled="disabled">Save</button>
    </form>
    <div class="btn-container">
      <button
        type="button"    
        @click="hasHistory() 
        ? $router.go(-1) 
        : $router.push('/')" class="btn-back">&laquo; 
        >Back
      </button>
      <button class="delete-exp" v-if="expToEdit._id" @click="removeExp">Delete</button>
    </div>
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
      options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }, {
          value: 'Option6',
          label: 'Option6'
        }, {
        }, {
          value: 'Option7',
          label: 'Option7'
        }, {
        }, {
          value: 'Option8',
          label: 'Option8'
        }, {
        }, {
          value: 'Option9',
          label: 'Option9'
        }, {
        }, {
          value: 'Option10',
          label: 'Option10'
        }, {
        }, {
          value: 'Option11',
          label: 'Option11'
        }, {
        }, {
          value: 'Option12',
          label: 'Option12'
        }, {
        }, {
          value: 'Option13',
          label: 'Option13'
        }, {
        }, {
          value: 'Option14',
          label: 'Option14'
        }, {
        }, {
          value: 'Option15',
          label: 'Option15'
        }, {
        }, {
          value: 'Option16',
          label: 'Option16'
        }, {
          value: 'Option17',
          label: 'Option17'
        }, {
          value: 'Option18',
          label: 'Option18'
        }, {
          value: 'Option19',
          label: 'Option19'
        }, {
          value: 'Option20',
          label: 'Option20'
        }],
        value1: []
    };
  },
  components: {
    datePicker
  },
  computed: {
    isNotEnoughImg() {
      return this.expToEdit.imgUrls < 5;
    }
  },
  methods: {
    hasHistory() {
      return window.history.length > 2;
    },
    async loadExp() {
      let expId = this.$route.params.id;
      if (expId) {
        const exp = await expService.getById(expId);
        this.expToEdit = JSON.parse(JSON.stringify(exp));
        this.expToEdit.tags.forEach(element => {
          this.value1.push(element)
        });
      } else {
        this.expToEdit = expService.getEmptyExp();
      }
    },
    setDay(day) {
      if (day !== null || this.expToEdit.date !== null) this.disabled = false;
      this.expToEdit.date = day
    },
    async saveExp() {
      if (!this.expToEdit.title) return;
      this.expToEdit.createdBy._id = this.loggedinUser._id;
      this.expToEdit.createdBy.fullName = this.loggedinUser.fullName;
      this.expToEdit.createdBy.imgUrl = this.loggedinUser.imgUrl;
      this.expToEdit.createdBy.info = this.loggedinUser.info;
      this.expToEdit.tags = this.value1 
      await this.$store.dispatch({ type: "saveExp", exp: this.expToEdit });
      this.$router.push("/");
      this.loadExp();
    },
    async removeExp() {
      const savedExp = await this.$store.dispatch({
        type: "removeExp",
        id: this.expToEdit._id
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
    }
  },
  created() {
    this.loadExp();
    this.loggedinUser = this.$store.getters.loggedinUser;
  },
  watch: {
    "$route.params.expId"() {
      this.loadExp();
    }
  }
};
</script>
