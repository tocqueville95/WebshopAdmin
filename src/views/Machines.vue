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
        <v-layout
          justify-end
        >
          <v-flex xs10>
            <v-alert
              :value="added"
              dismissible
              type="success"
              transition="scale-transition"
            >
              Machine succesvol toegevoegd
            </v-alert>
            <v-alert
              :value="edited"
              dismissible
              type="success"
              transition="scale-transition"
            >
              Machine succesvol gewijzigd
            </v-alert>
          </v-flex>
          <v-flex xs2>
            <router-link to="/machines/new">
              <v-btn
                color="primary"
                block
              >
                Nieuw machine
              </v-btn>
            </router-link>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
      >
        <material-card
          color="blue"
          title="Machines"
        >
          <v-card-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="machines"
            :pagination.sync="pagination"
            :search="search"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-primary text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <tr @click="toMachine(item)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.machineName }}</td>
                <td class="text-xs-right">
                  €{{ Number(item.price).toFixed(2) }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      added: false,
      edited: false,
      search: '',
      machines: [],
      pagination: {
        rowsPerPage: 25,
      },
      headers: [
        {
          sortable: false,
          text: 'Index',
          value: 'index',
        },
        {
          sortable: false,
          text: 'Machinenaam',
          value: 'machineName',
        },
        {
          sortable: false,
          text: 'Prijs',
          value: 'price',
          align: 'right',
        },
      ],
    };
  },
  watchQuery: ['addedSuccessfully', 'editedSuccessfully'],
  mounted() {
    if (this.$route.query.addedSuccessfully) { this.added = true; }
    if (this.$route.query.editedSuccessfully) { this.edited = true; }
    this.$axios.get('/machines')
      .then((res) => {
        this.machines = res.data;
      });
  },
  methods: {
    toMachine(machine) {
      this.$router.push(`/machines/${machine.id}`);
    },
  },
};
</script>
