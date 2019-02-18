<template>
    <div class="container">
        <div class="row">
            <div class="col-12 mt-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">User List</h3>

                        <div class="card-tools">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#addNew">
                                Add new user
                            </button>
                        </div>
                    </div>
                    <!-- /.card-header -->
                    <div class="card-body table-responsive p-0">
                        <table class="table table-hover">
                            <tbody>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Registered Date</th>
                                    <th>Modify</th>
                                </tr>
                                <tr v-for="user in users" :key="user.id">
                                    <td>{{ user.id }}</td>
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>{{ user.type | capitalize }}</td>
                                    <td>{{ user.created_at | date }}</td>
                                    <td>
                                        <router-link :to="'/admin/users/' + user.id">
                                            <i class="fa fa-edit"></i>
                                        </router-link>
                                        <a href="#" @click="deleteUser(user.id)">
                                            <i class="fa fa-trash"></i>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- /.card-body -->
                </div>
                <!-- /.card -->
            </div>
        </div>
    
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="createUser">
                        <div class="modal-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input placeholder="Steve" v-model="form.name" type="text" name="name" class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                                <has-error :form="form" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input placeholder="steve@me.com" v-model="form.email" type="email" name="email" class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
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
                            <div class="form-group">
                                <label>Password</label>
                                <input placeholder="password" v-model="form.password" type="password" name="password" class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>
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
                users: {},
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    type: ''
                })
            }
        },
        methods: {
            loadUsers() {
                axios.get('/api/user').then( ({ data }) => (this.users = data.data) );
            },
            createUser() {
                this.$Progress.start();

                this.form.post('/api/user')
                .then(() => {
                    $('#addNew').modal('hide');
                    Fire.$emit('AfterCreateUser');
                    Toast.fire({
                        type: 'success',
                        title: 'User created successfully'
                    })
                    this.$Progress.finish();
                })
                .catch(() => { this.$Progress.fail(); });
            },
            deleteUser(id) {
                Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete user!'
                }).then((result) => {
                    axios.delete('/api/user/'+id, {}).then(() => {
                        Fire.$emit('AfterCreateUser');
                        Swal.fire(
                            'Deleted!',
                            'User has been delete.',
                            'success'
                        )
                    }).catch(() => {
                        Swal.fire(
                            'Could not delete user!',
                            result.value.message,
                            'error'
                        )
                    });
                })
            }
        },
        created() {
            this.loadUsers()
            Fire.$on('AfterCreateUser', () => {
                this.loadUsers();
            });
            // setInterval(() => this.loadUsers(), 3000);

        }
    }
</script>
