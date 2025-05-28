// //key
// //sd - self described
// //@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax
//
// import React from "react";
// import {handleResetPassword} from "../../controllers/login-controller";
// import {textValueChanged} from "../../util/data-collection-utils";
// import {Button, Text, View} from "react-native";
// import { TextField } from "react-native-material-textfield";
//
// export default function ResetPasswordForm(props) {
//
//   let {resetPasswordModel, notificationAlert} = props;
//
//   // const useStyles = makeStyles((theme) => ({
//   //   root: {
//   //     '& > *': {
//   //       margin: theme.spacing(1),
//   //       width: '25ch',
//   //     },
//   //   },
//   // }));
//   //
//   // const classes = useStyles();
//
//   return (
//       <React.Fragment>
//         <View
//             // className={classes.root} noValidate autoComplete="off"
//         >
//           <TextField
//               id="username-or-email"
//               label="Username/Email" type={'text'}
//               onChange={text => textValueChanged(resetPasswordModel, text, 'usernameOrEmail', null)}
//           />
//           <Text>{'\n'}</Text>
//           <TextField
//               id="password"
//               label="New Password" type={'password'}
//               onChange={text => textValueChanged(resetPasswordModel, text, 'password', null)}
//           />
//           <Text>{'\n'}</Text>
//           <TextField
//               id="confirmPassword"
//               label="Confirm Password" type={'password'}
//               onChange={text => textValueChanged(resetPasswordModel, text, 'confirmPassword', null)}
//           />
//           <Text>{'\n'}</Text>
//           <Button
//               title="Reset Password"
//               // variant="contained"
//               // color="primary" type={'submit'}
//               onPress={e => {
//                 // e.preventDefault();
//                 handleResetPassword(notificationAlert);
//               }}
//           />
//         </View>
//       </React.Fragment>
//   )
// }
