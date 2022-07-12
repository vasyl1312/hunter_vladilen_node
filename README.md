# hunter_vladilen_node

# Courses site

Part `Express`

1.  Work with html-files
2.  Connect handlebars
3.  Update Layout, materialize(this is for update all page in 1 place)
4.  Add navigation(navbar(this we have in top btns to open pages), style, buty)
5.  Rendering, work with pages courses and add.hbs, title for all pages, active page(add lighting)
6.  Register routes, push each routes to other .js file
7.  Update form, when input new course(add page)
8.  Create model, save new course to database
9.  Output the list of courses in page(Courses)
10. Connect client scripts, style for price
11. Button 'Open course', find course by id, open course in new page
12. Edit Courses Page
13. Add cart for buying courses
14. Cart model, count all price, add product to cart and check, that this product is already in
15. Output data in the cart, check when cart is empty
16. Work with async request(delete course from card)
17. Some actions with card

Part `MongoDb`

1. Connect to MongoDB, instantiating mongoose
2. Create model for mongo, edit routes for this
3. Update model, solve handlebars errors
4. Delete course
5. Model for user
6. Add user,for future add new course = remember user id
7. Update card, delete db from project, new course remember user id
8. View in the cart page, count total price(difficult actions)
9. Delete course
10. Work with _id-bugs(do without _) in remove-method
11. Prepare page to ordering, routing, btn, model for order
12. Work with ordering, remember user id, count and course, after clear cart, show order in page
13. Output order (layouts), logic to show and each order to each user, have a bugs with count, date, price

Part `Authorization and session`

1. Login page(materialize), routes
2. Add session, hidding pages for non- auth user and show for auth
3. Save session, delete our temporary user
4. Session in DB, hidding buttons 'edit' 'buy' for non-authenticated user
5. Secure routes(when user is'n auth, he can type routes and it will work => fix it)
6. Work with cart bugs
7. User registration
8. Login user, non-temporary user from code => data from register, check password, email
9. Password Encryption
10. Add CSRF-security to all post requests
11. Alerts errors, for instance, check correct password, email and is already register email

Part `Work with Email`

1. Object configuration(create file with constants)
2. Setting email service when user do a registration(sendgrid=>have to register in sendgrid, verify email, answer the questions for what you want to use sendgrid, create api key, verify sending-email, connect for node)
3. Password recovery

---

Part `For future pet-project`

- Bugs in order to show date, count and price
- Add info about ownwer of shop
- Send letter about site to email when user done registration
