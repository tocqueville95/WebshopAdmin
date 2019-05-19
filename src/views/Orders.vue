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
            <router-link to="/order/new">
              <v-btn
                color="orange"
                block
              >
                Nieuwe order
              </v-btn>
            </router-link>
          </v-flex>
        </v-layout>
        <material-card
          color="orange"
          title="Bestellingen"
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
            :items="orders"
            :pagination.sync="pagination"
            :search="search"
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <tr @click="toOrder(item)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.ordernumber }}</td>
                <td class="text-xs-right">
                  €{{ Number(item.total).toFixed(2) }}
                </td>
                <td class="text-xs-right">
                  Stad
                </td>
                <td class="text-xs-right">
                  {{ item.status }}
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
/* eslint-disable no-param-reassign */

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
          text: 'Bestelnummer',
          value: 'ordernumber',
        },
        {
          sortable: false,
          text: 'Totaal',
          value: 'total',
          align: 'right',
        },
        {
          sortable: false,
          text: 'Stad',
          value: 'city',
          align: 'right',
        },
        {
          sortable: false,
          text: 'Status',
          value: 'status',
          align: 'right',
        },
      ],
      orders: [],
    };
  },
  mounted() {
    this.$axios.get('orders')
      .then((res) => {
        const orders = res.data;
        orders.forEach((order) => {
          order.total = 0;
          order.products.forEach((product) => {
            order.total += (product.count * product.productPrice);
          });
        });
        this.orders = orders;
      });
  },
  methods: {
    toOrder(order) {
      this.$router.push(`/orders/${order.id}`);
    },
  },
};
</script>
