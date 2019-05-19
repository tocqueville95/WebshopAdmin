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
          title="Nieuw product"
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
                  id="product.name"
                  v-model="product.productName"
                  :rules="nameRules"
                  type="text"
                  name="product.productName"
                  label="Productnaam"
                />
                <v-textarea
                  v-model="product.shortDescription"
                  :rules="shortDescriptionRules"
                  name="input-7-1"
                  label="Korte beschrijving"
                  hint="Korte beschrijving"
                />
                <v-autocomplete
                  v-model="product.category"
                  :items="categoryList"
                  label="Categorie"
                  persistent-hint
                  chips
                  multiple
                />
                <v-text-field
                  id="productCategoryNew"
                  v-model="category"
                  type="text"
                  name="productCategory"
                  label="Nieuwe categorie"
                />
                <v-layout>
                  <v-flex xs6>
                    <v-text-field
                      v-model="product.discount"
                      :rules="discountRules"
                      name="discount"
                      label="Korting"
                      hint="Korting"
                      value="0"
                    />
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field
                      v-model="product.price"
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
              <v-flex
                xs12
                lg8
              >
                <!-- Text Editor -->
                <VueEditor
                  v-model="product.longDescription"
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
              @click="saveProduct"
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
      product: {},
      nameRules: [
        v => !!v || 'Productnaam is verplicht',
      ],
      shortDescriptionRules: [
        v => !!v || 'Korte beschrijving is verplicht',
      ],
      discountRules: [
        v => /^[0-9]*$/.test(v) || 'Korting moet een getal zijn',
      ],
      priceRules: [
        v => !!v || 'Prijs is verplicht',
        v => /^[0-9]*$/.test(v) || 'Prijs moet een getal zijn',
      ],
      categoryList: [],
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
    this.onResponsive();
    if (this.$route.params.id) {
      this.$axios.get(`products/${this.$route.params.id}`)
        .then((res) => {
          this.product = res.data;
          this.photo = this.product.photo;
        });
    }
    this.$axios.get('products//categories')
      .then((res) => { this.categoryList = res.data; });
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
          this.product.photo = res.data;
        });
    },
    saveProduct() {
      this.validate();
      if (this.valid) {
        this.product.photo = this.photo;
        if (this.category) {
          if (this.product.category) { this.product.category.push(this.category); } else {
            this.product.category = [];
            this.product.category.push(this.category);
          }
        }
        if (this.$route.params.id) {
          this.$axios.put(`products/${this.$route.params.id}`, this.product)
            .then(() => { this.$router.push('/products?editedSuccessfully=true'); });
        } else {
          this.$axios.post(`products/${this.$route.params.id}`, this.product)
            .then(() => { this.$router.push('/products?editedSuccessfully=true'); });
        }
      } else {
        this.alert = true;
      }
    },
    onResponsive() {
      if (window.innerWidth < 991) {
        this.previewStyle = 'tab';
      } else {
        this.previewStyle = 'vertical';
      }
    },
  },
};
</script>
