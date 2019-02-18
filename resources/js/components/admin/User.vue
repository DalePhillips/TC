<template>
    <div class="container mt-4">
        <div class="row justify-content-center">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">User</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editUserMoney">
                                Add Money
                            </button>
                            <button type="button" class="btn btn-primary" @click="editModal(user)">
                                Edit user
                            </button>
                        </div>
                    </div>

                    <div class="card-body">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered Date</th>
                                </tr>
                                <tr>
                                    <td>{{ this.user.id }}</td>
                                    <td>{{ this.user.name }}</td>
                                    <td>{{ this.user.email }}</td>
                                    <td>{{ this.user.type | capitalize }}</td>
                                    <td>{{ this.user.created_at | date }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>Money</th>
                                    <th>Health</th>
                                    <th>Stamina</th>
                                    <th>Intellect</th>
                                    <th>Registered Date</th>
                                </tr>
                                <tr>
                                    <td>${{ this.user_stats.money }}</td>
                                    <td>{{ this.user_stats.health }} HP</td>
                                    <td>{{ this.user_stats.stamina }}</td>
                                    <td>{{ this.user_stats.intellect }}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    
        <!-- Modal -->
        <div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editUser">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input value="" placeholder="Steve" v-model="form.name" type="text" name="name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input value="" placeholder="steve@me.com" v-model="form.email" type="email" name="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                                <has-error :form="form" field="email"></has-error>
                            </div>
                            <div class="form-group">
                                <label>User Role</label>
                                <select name="type" id="type" v-model="form.type" class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                                    <option value="">Please select user role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
        <!-- Modal -->
        <div class="modal fade" id="editUserMoney" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editUserMoney">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Money to add</label>
                                <input value="" placeholder="500" v-model="moneyForm.moneyToAdd" type="text" name="moneyToAdd" class="form-control" :class="{ 'is-invalid': form.errors.has('moneyToAdd') }">
                                <has-error :form="moneyForm" field="moneyToAdd"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                user: {},
                user_stats: {},
                form: new Form({
                    name: '',
                    email: '',
                    type: ''
                }),
                moneyForm: new Form({
                    moneyToAdd: ''
                })
            }
        },
        methods: {
            loadUser() {
                axios.get('/api/user/'+this.$route.params.id).then( ({ data }) => (this.user = data) );
                axios.get('/api/userstats/'+this.$route.params.id).then( ({ data }) => (this.user_stats = data) );
            },
            editModal(user) {
                this.form.reset();
                $('#editUser').modal('show');
                this.form.fill(user);
            },
            editUser() {
                this.$Progress.start();

                this.form.put('/api/user/'+this.$route.params.id)
                .then(() => {
                    $('#editUser').modal('hide');
                    this.loadUser()
                    Toast.fire({
                        type: 'success',
                        title: 'User edited successfully'
                    })
                    this.$Progress.finish();
                })
                .catch(() => { this.$Progress.fail(); });
            },
            editUserMoney() {
                this.$Progress.start();

                this.moneyForm.post('/api/addmoney/'+this.$route.params.id)
                .then(() => {
                    $('#editUserMoney').modal('hide');
                    this.loadUser()
                    Toast.fire({
                        type: 'success',
                        title: 'Money added successfully'
                    })
                    this.$Progress.finish();
                    this.moneyForm.reset();
                })
                .catch(() => { this.$Progress.fail(); });
            }
        },
        created() {
            this.loadUser()
            console.log('Component mounted.')
        }
    }
</script>
