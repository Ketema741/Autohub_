import {
  GET_USERS,
  ADD_CART,
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
  GET_SERVISEPROVIERS,
  GET_SUPPLIER,
  GET_SERVISEPROVIER,
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
} from '../Types';

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
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
      const approvedSupplierId = action.payload;
      const updatedPendingSuppliers = state.pendingSuppliers.filter(user => user.id !== approvedSupplierId);
      return {
        ...state,
        pendingSuppliers: updatedPendingSuppliers,
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

    case GET_SERVISEPROVIERS:
      return {
        ...state,
        serviceProviders: action.payload.data,
      };

    case GET_SERVISEPROVIER:
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
        user: action.payload,
      };
    case ADD_CART:
      return {
        ...state,
        carts: [...action.payload],
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
        users: state.users.filter(
          (user) => user._id !== action.payload,
        ),
      };

    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        filtered: null,
        error: null,
        current: null,
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
        filteredServiceProviders: state.serviceProviders.filter(({ firstName, lastName }) => {
          const testString = `${firstName}${lastName}`.toLowerCase();
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
