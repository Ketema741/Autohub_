import {
  GET_USERS,
  ADD_CART,
  GET_CUSTOMERORDERS,
  VERIFY_PAYMENT,
  UPDATE_CART,
  DELETE_CART,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_USER,
  FILTER_USERS,
  CLEAR_USERS,
  CLEAR_FILTER,
  USER_ERROR,
  GET_DRIVER,
  GET_DRIVERS,
  FILTER_DRIVERS,
  GET_SUPPLIERS,
  GET_EXEPRTS,
  GET_SERVISEPROVIDERS,
  GET_SUPPLIER,
  GET_SERVISEPROVIDER,
  GET_EXEPRT,
  FILTER_SERVISEPROVIERS,
  FILTER_EXEPRTS,
  FILTER_SUPPLIERS,
  GET_PENDINGEXEPRTS,
  GET_PENDINGSUPPLIERS,
  APPROVE_SUPPLIER,
  APPROVE_EXPERT,
  REJECT_EXPERT,
  REJECT_SUPPLIER,
  GET_USER,
  GET_CARTITEMS,
  USER_ORDER,
  CHECK_OUT,
} from '../Types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        customers: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        customer: action.payload.data,
      };

    case GET_DRIVERS:
      return {
        ...state,
        drivers: action.payload.data,
      };
    case GET_DRIVER:
      return {
        ...state,
        driver: action.payload.data,
      };

    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload.data,
      };
    case GET_PENDINGSUPPLIERS:
      return {
        ...state,
        pendingSuppliers: action.payload,
      };
    case APPROVE_SUPPLIER:
      const approvedSupplierId = action.payload._id;
      const updatedPendingSuppliers = state.pendingSuppliers.filter(user => user._id !== approvedSupplierId);
      const updatedActiveSuppliers = [action.payload, ...state.suppliers];
      return {
        ...state,
        pendingSuppliers: updatedPendingSuppliers,
        suppliers: updatedActiveSuppliers,
      };

    case REJECT_SUPPLIER:
      const rejectedSupplierId = action.payload;
      const newPendingSuppliers = state.pendingSuppliers.filter(user => user.id !== rejectedSupplierId);
      return {
        ...state,
        pendingSuppliers: newPendingSuppliers,
      };

    case GET_SUPPLIER:
      return {
        ...state,
        supplier: action.payload.data,
      };

    case GET_SERVISEPROVIDERS:
      return {
        ...state,
        serviceProviders: action.payload.data,
      };

    case GET_SERVISEPROVIDER:
      return {
        ...state,
        serviceProvider: action.payload.data,
      };

    case GET_EXEPRTS:
      return {
        ...state,
        aficionados: action.payload.data,
      };
    case GET_PENDINGEXEPRTS:
      return {
        ...state,
        pendingAficionados: action.payload.data,
      };

    case APPROVE_EXPERT:
      const approvedExpertId = action.payload;
      const updatedPendingExperts = state.pendingExperts.filter(user => user.id !== approvedExpertId);
      return {
        ...state,
        pendingAficionados: updatedPendingExperts,
      };

    case REJECT_EXPERT:
      const rejectedExpertId = action.payload;
      const newPendingExperts = state.pendingExperts.filter(user => user.id !== rejectedExpertId);
      return {
        ...state,
        pendingAficionados: newPendingExperts,
      };

    case GET_EXEPRT:
      return {
        ...state,
        aficionado: action.payload.data,
      };

    case UPDATE_USER:
      return {
        ...state,
        customer: action.payload,
      };
    case ADD_CART:
      return {
        ...state,
        carts: [...action.payload],
      };
    case GET_CUSTOMERORDERS:
      return {
        ...state,
        customerOrders: [...action.payload],
      };
    case USER_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CHECK_OUT:
      return {
        ...state,
        chapaPaymentURL: action.payload,
      };
    case VERIFY_PAYMENT:
      return {
        ...state,
        isPaymentVerified: action.payload,
      };
    case GET_CARTITEMS:
      return {
        ...state,
        carts: action.payload,
      };
    case UPDATE_CART:
      return {
        ...state,
        carts: [action.payload, ...state.carts],
      };

    case DELETE_CART:
      return {
        ...state,
        carts: state.carts.filter(
          (favourite) => favourite._id !== action.payload,
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload,
        ),
      };

    case CLEAR_USERS:
      return {
        ...state,
        customers: null,
        filtered: null,
        error: null,
        current: null,
        drivers: null,
        serviceProviders: null,
        aficionados: null,
        suppliers: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: state.users.filter(({ name, location }) => {
          const testString = `${name}${location}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };

    case FILTER_DRIVERS:
      return {
        ...state,
        filteredDrivers: state.drivers.filter(({ firstName, lastName }) => {
          const testString = `${firstName}${lastName}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };

    case FILTER_SERVISEPROVIERS:
      return {
        ...state,
        filteredServiceProviders: state.serviceProviders.filter(({ firstName, address }) => {
          const testString = `${firstName}${address}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case FILTER_EXEPRTS:
      return {
        ...state,
        filteredAficionados: state.aficionados.filter(({ firstName, lastName }) => {
          const testString = `${firstName}${lastName}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case FILTER_SUPPLIERS:
      return {
        ...state,
        filteredSuppliers: state.suppliers.filter(({ firstName, lastName }) => {
          const testString = `${firstName}${lastName}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredDrivers: null,
        filteredUsers: null,
        filteredServiceProviders: null,
        filteredAficionados: null,
        filteredSuppliers: null,
      };
    case USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default userReducer;
