const mongoose = require( "mongoose" )
const conn_str = "mongodb+srv://ladsanjana6:mern@cluster0.dzpnzs8.mongodb.net/ums?retryWrites=true&w=majority";


mongoose.connect( conn_str )
    .then( () => console.log( `Connected Successfully...` ) )
    .catch( ( err ) => console.log( err ) )

const express = require( `express` )
const app = express()
const PORT = 8989

// CW Create api
const userSchema = new mongoose.Schema( {
    name: String,
    age: String,
    city: String
} )

const cors = require( 'cors' )
app.use( cors() )
app.use( express.json() )

const user = new mongoose.model( `users`, userSchema )

// Get Data
// http://localhost:8989/users/
app.get( '/users', async ( req, res ) => {
    let data = await user.find();
    res.send( data )
} )

// Get By Id
// http://localhost:8989/users/65a3607af7e6a7636e732063
app.get( '/users/:id', async ( req, res ) => {
    let data = await user.find( { '_id': req.params[ 'id' ] } )
    res.send( data[ 0 ] )
} )

// PUT DATA
// {
// "id": "65a3818282e64432fada1497",
// "name": "Chaitrali",
// "age": "24",
// "city": "Ghansoli"
// }
app.put( '/users', async ( req, res ) => {
    // if ( !req.body.id ) {
    //     return res.status( 400 ).send( "ID is required in the request body" );
    // }

    console.log( req.body );
    let result = await user.updateOne( { '_id': req.body.id },
        {
            '$set': {
                'name': req.body.name,
                'age': req.body.age,
                'city': req.body.city
            }
        } );
    res.send( result );
} )


// POST DATA
app.post( '/users', async ( req, res ) => {
    // let data = {
    // {
    //     'name': 'abc',
    //     'age': 22,
    //     'city': 'Thane'
    // }
    // let obj = new user(data)
    console.log( req.body );
    let obj = new user( req.body )
    let result = await obj.save();
    res.send( result )
} )

// DELETE DATA
// http://localhost:8989/users?id=65a3607af7e6a7636e732063
app.delete( '/users', async ( req, res ) => {
    let data = await user.deleteOne( { _id: req.query.id } )
    res.send( data )
} )

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
} )