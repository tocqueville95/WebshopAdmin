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
          <v-flex xs2>
            <nuxt-link to="/admin/users/new">
              <v-btn
                color="success"
                block
              >
                Nieuwe klant
              </v-btn>
            </nuxt-link>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex
        xs12
      >
        <material-card
          color="green"
          title="Klanten"
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
            :items="users"
            :pagination.sync="pagination"
            :search="search"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <tr @click="toUser(item)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.firstName }}</td>
                <td>{{ item.lastName }}</td>
                <td>{{ item.username }}</td>
                <td>0614951903</td>
                <td>{{ item.role }}</td>
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
      search: '',
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
          text: 'Voornaam',
          value: 'firstName',
        },
        {
          sortable: false,
          text: 'Achternaam',
          value: 'lastName',
        },
        {
          sortable: false,
          text: 'E-mailadres',
          value: 'username',
        },
        {
          sortable: false,
          text: 'Telefoonnummer',
          value: 'phone',
        },
        {
          sortable: false,
          text: 'Rol',
          value: 'role',
        },
      ],
      users: [],
    };
  },
  mounted() {
    this.$axios.$get('users')
      .then((res) => { this.users = res.data; });
  },
  methods: {
    toUser(order) {
      this.$router.push(`/users/${order.id}`);
    },
  },
};
</script>
