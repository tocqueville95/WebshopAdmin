<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        sm6
        xs12
        md6
        lg4
      >
        <material-stats-card
          color="green"
          icon="mdi-store"
          title="Omzet"
          value="€200,00"
          sub-icon="mdi-calendar"
          sub-text="Laatste 5 bestellingen"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg4
      >
        <material-stats-card
          color="orange"
          icon="mdi-content-copy"
          title="Onbetaalde bestellingen"
          value="5"
          sub-icon="mdi-alert"
          sub-icon-color="error"
          sub-text="Controleer op overboekingen"
          sub-text-color="text-primary"
        />
      </v-flex>
      <v-flex
        sm6
        xs12
        md6
        lg4
      >
        <material-stats-card
          color="red"
          icon="mdi-information-outline"
          title="Openstaande vragen"
          value="10"
          sub-icon="mdi-tag"
          sub-text="Via het contactformulier"
        />
      </v-flex>

      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Laatste 10 bestellingen"
        >
          <v-data-table
            :headers="headersOrders"
            :items="orders"
            hide-actions
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

      <v-flex
        md12
        lg6
      >
        <material-card
          color="orange"
          title="Employee Stats"
          text="New employees on 15th September, 2016"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
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
              <tr>
                <td>{{ item.name }}</td>
                <td class="text-xs-right">
                  {{ item.salary }}
                </td>
                <td class="text-xs-right">
                  {{ item.country }}
                </td>
                <td class="text-xs-right">
                  {{ item.city }}
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
      orders: [],
      file: '',
      items: [
        {
          name: '',
          salary: '',
          country: '',
          city: '',
        },
      ],
      headersOrders: [
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
    };
  },
  mounted() {
    this.$axios.get('orders?limit=10')
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
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      const formData = new FormData();
      formData.append('file', this.file);

      this.$axios.$post(`${this.$axios.defaults.baseURL}/uploads`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          console.log(res);
        });
    },
    toOrder(order) {
      this.$router.push(`/admin/orders/${order.id}`);
    },
  },
};
</script>

<style lang="scss">
tr {
  cursor: pointer;
}
</style>
