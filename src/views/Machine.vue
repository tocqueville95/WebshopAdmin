<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        xs12
      >
        <material-card
          color="orange"
          title="Nieuwe machine"
          text="Gelieve alle velden in te vullen"
        >
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-layout wrap>
              <v-flex
                xs12
                lg4
              >
                <v-text-field
                  id="machine.name"
                  v-model="machine.machineName"
                  :rules="nameRules"
                  type="text"
                  name="machine.machineName"
                  label="Machinenaam"
                />
                <v-textarea
                  v-model="machine.description"
                  :rules="shortDescriptionRules"
                  name="input-7-1"
                  label="Korte beschrijving"
                  hint="Korte beschrijving"
                />
                <v-autocomplete
                  v-model="machine.type"
                  :items="categoryList"
                  label="Categorie"
                  persistent-hint
                  chips
                  multiple
                />
                <v-layout>
                  <v-flex xs12>
                    <v-text-field
                      v-model="machine.price"
                      :rules="priceRules"
                      name="price"
                      label="Prijs"
                      hint="Prijs"
                      value="0"
                    />
                  </v-flex>
                </v-layout>

                <div class="wrapper">
                  <input
                    id="file"
                    ref="file"
                    type="file"
                    name="file"
                    @change="handleFileUpload"
                  >
                  <v-btn
                    color="primary"
                    @click="submitFile()"
                  >
                    Submit
                  </v-btn>
                </div>
                <v-img
                  :src="photo.url"
                  :alt="photo.alt"
                  :title="photo.title"
                  aspect-ratio="1"
                />
              </v-flex>
            </v-layout>
          </v-form>
        </material-card>
      </v-flex>
      <v-flex
        xs12
      >
        <v-layout
          justify-end
        >
          <v-flex xs10>
            <v-alert
              :value="!valid"
              type="error"
              transition="scale-transition"
            >
              Niet alle vereiste velden zijn ingevuld.
            </v-alert>
          </v-flex>
          <v-flex xs2>
            <v-btn
              color="primary"
              block
              @click="saveMachine"
            >
              Opslaan
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { VueEditor } from 'vue2-editor';

export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      valid: true,
      alert: false,
      category: '',
      machine: {},
      nameRules: [
        v => !!v || 'Machinenaam is verplicht',
      ],
      shortDescriptionRules: [
        v => !!v || 'Korte beschrijving is verplicht',
      ],
      discountRules: [
        v => /^[0-9]*$/.test(v) || 'Korting moet een getal zijn',
      ],
      priceRules: [
        v => /^[0-9]*$/.test(v) || 'Prijs moet een getal zijn',
      ],
      categoryList: [
        'vending',
        'coffee',
        'occasion',
      ],
      file: '',
      content: [
        'test',
      ],
      previewStyle: 'tab',
      photo: {
        url: 'https://via.placeholder.com/1000x1000.png?text=Geen+afbeelding+geselecteerd',
        alt: 'Geen afbeelding',
        title: 'Geen afbeelding',
      },
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.$axios.get(`machines/${this.$route.params.id}`)
        .then((res) => {
          this.machine = res.data;
          this.photo = this.machine.photo;
        });
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      this.$axios.post('uploads', formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          this.machine.photo = res.data;
          this.photo = res.data;
        });
    },
    saveMachine() {
      this.validate();
      if (this.valid) {
        this.machine.photo = this.photo;
        if (this.category) {
          if (this.machine.category) { this.machine.category.push(this.category); } else {
            this.machine.category = [];
            this.machine.category.push(this.category);
          }
        }
        if (this.$route.params.id) {
          this.$axios.put(`machines/${this.$route.params.id}`, this.machine)
            .then(() => { this.$router.push('/machines?editedSuccessfully=true'); });
        } else {
          this.$axios.post('machines', this.machine)
            .then(() => { this.$router.push('/machines?addedSuccessfully=true'); });
        }
      } else {
        this.alert = true;
      }
    },
  },
};
</script>
