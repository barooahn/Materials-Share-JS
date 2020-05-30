export default () => {
//   window.onbeforeprint = function () {
//     console.log("mobile called before print");
//     return false;
//   };
//   window.onafterprint = function () {
//     console.log("mobile called after print");
//     return document.documentElement.clientWidth < 600;
//   };
  return document.documentElement.clientWidth < 600;
};
