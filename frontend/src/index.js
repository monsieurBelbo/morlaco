import Alpine from 'alpinejs';
import { login, getProjects, getAccounts, getTransactions, createProject, createAccount, createTransaction } from './api';

window.Alpine = Alpine;

Alpine.data('app', () => ({
  isLoggedIn: false,
  email: '',
  password: '',
  loginError: '',
  projects: [],
  accounts: [],
  transactions: [],
  showNewProjectForm: false,
  showNewAccountForm: false,
  showNewTransactionForm: false,
  newProject: { name: '', type: 'Personal' },
  newAccount: { name: '', currency: '', initialBalance: 0, type: '', isOwn: true },
  newTransaction: { type: 'Expense', amount: 0, date: new Date().toISOString().split('T')[0], accountId: null },

  async login() {
    try {
      await login(this.email, this.password);
      this.isLoggedIn = true;
      this.loginError = ''; // Clear any previous error message
      this.loadData();
    } catch (error) {
      console.error('Login failed:', error);
      this.loginError = 'Login failed. Please check your email and password.'; // Set the error message
    }
  },

  async loadData() {
    this.projects = await getProjects();
    this.accounts = await getAccounts();
    this.transactions = await getTransactions();
  },

  async createProject() {
    try {
      await createProject(this.newProject);
      this.showNewProjectForm = false;
      this.newProject = { name: '', type: 'Personal' };
      this.loadData();
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  },

  async createAccount() {
    try {
      await createAccount(this.newAccount);
      this.showNewAccountForm = false;
      this.newAccount = { name: '', currency: '', initialBalance: 0, type: '', isOwn: true };
      this.loadData();
    } catch (error) {
      console.error('Failed to create account:', error);
    }
  },

  async createTransaction() {
    try {
      await createTransaction(this.newTransaction);
      this.showNewTransactionForm = false;
      this.newTransaction = { type: 'Expense', amount: 0, date: new Date().toISOString().split('T')[0], accountId: null };
      this.loadData();
    } catch (error) {
      console.error('Failed to create transaction:', error);
    }
  }
}));

Alpine.start();
