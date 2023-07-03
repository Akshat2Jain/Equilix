# 🌟 Equilix - VS Code Extension

Equilix extension for Visual Studio Code! This extension enhances the editing experience by automatically equality/inequality operators from `==` to `===` and `!=` to `!==` on save.


## ✨ Features

- Conversion of equality (`==`) and inequality (`!=`) operators to strict equality (`===`) and strict inequality (`!==`).
- Real-time feedback with an on-save popup notification indicating the successful conversion.

## Eliminates Manual ESLint Setup: 

- With Equilix, there's no need to manually run ESLint with the --fix flag modify   package.json scripts. Equilix seamlessly integrates into Visual Studio Code and automatically applies the necessary code transformations on save. This eliminates the extra steps of running ESLint separately and simplifies the development workflow.
By using Equilix, you can avoid the hassle of configuring and running ESLint with --fix, setting up scripts in package.json, and ensuring consistent execution across different environments. Equilix provides a more straightforward and streamlined approach to code transformations, making the process quicker and more convenient.

## 📋 Requirements

- Visual Studio Code version 1.56.0 or above.

## 🚀 Installation

1. Launch Visual Studio Code.
2. Go to the Extensions view (Ctrl+Shift+X).
3. Search for "Equilix" and click Install.
4. Reload Visual Studio Code to activate the extension.

## 🎯 Usage

1. Open a JavaScript file (.js) in Visual Studio Code.
2. As you save the file, Equilix will automatically convert and `==` to `===` and `!=` to `!==`.
3. If any conversions are made, a success notification popup will be displayed will the line number where that conversion happened

## ⚙️ Configuration

Equilix does not require any additional configuration. It works out of the box with the default settings.

## 💌 Feedback and Contributions

- If you encounter any issues or have suggestions, please [open an issue](https://github.com/Akshat2Jain/Equilix/issues).
- Contributions are welcome! Feel free to fork the repository and submit a pull request.

## 📄 License

This extension is licensed under the [MIT License](LICENSE).

---

Thank you for using Equilix! If you find it helpful, don't forget to leave a ⭐️ on the [GitHub repository](https://github.com/Akshat2Jain/Equilix). If you have any questions or need further assistance, please don't hesitate to reach out.

Happy coding! ✨🚀
