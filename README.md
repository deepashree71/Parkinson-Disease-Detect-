# 🧠 Parkinson's Disease Detection Through Handwriting Analysis


An AI-powered web application that detects early signs of Parkinson's Disease by analyzing handwriting patterns using machine learning.

## 🌐 Live Demo

**Try it now:** (parkinson-disease-detect-3hh1qll1y-deepashree.vercel.app)

Experience the application live and see the AI analysis in action!

## 🎯 Project Overview

Parkinson's Disease is a progressive neurodegenerative disorder that affects motor functions, including handwriting. This project leverages machine learning to identify characteristic handwriting patterns associated with Parkinson's Disease, enabling early detection and monitoring.

### Key Features

- **Handwriting Analysis**: Upload handwriting samples for automated analysis
- **Machine Learning Model**: Trained on handwriting characteristics specific to Parkinson's Disease
- **Real-time Predictions**: Instant analysis results with confidence scores
- **User-Friendly Interface**: Clean, intuitive web interface built with modern technologies
- **Accessibility**: Web-based application accessible from any device

## 🔬 How It Works

Parkinson's Disease affects handwriting through:
- **Micrographia**: Progressive reduction in letter size
- **Tremor**: Irregular pen movements and shaky lines
- **Slow Movement**: Reduced writing speed and fluidity
- **Irregular Spacing**: Inconsistent gaps between letters and words

Our model analyzes these patterns to provide diagnostic insights.

## 🛠️ Technology Stack

- **Frontend**: React.js / Next.js
- **Deployment**: Vercel
- **Machine Learning**: Python (scikit-learn / TensorFlow / PyTorch)
- **Backend**: Node.js / Flask / FastAPI
- **Image Processing**: OpenCV / PIL

## 📊 Model Performance

The machine learning model has been trained on handwriting samples with the following characteristics:
- High accuracy in detecting Parkinson's-related handwriting patterns
- Robust feature extraction for micrographia and tremor detection
- Validated on diverse handwriting samples

## 🚀 Getting Started

### Prerequisites

```bash
Node.js (v14 or higher)
Python (v3.8 or higher)
npm or yarn
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/deepashree71/Parkinson-Disease-Detect-.git
cd Parkinson-Disease-Detect-
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up the machine learning model
```bash
cd model
pip install -r requirements.txt
```

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 💻 Usage

1. **Upload Handwriting Sample**: Choose an image of handwriting (spiral drawing or sentence writing)
2. **Analyze**: Click the analyze button to process the image
3. **View Results**: Get instant predictions with confidence scores
4. **Interpret**: Review the analysis and recommendations

## 📁 Project Structure

```
Parkinson-Disease-Detect/
├── components/          # React components
├── pages/              # Next.js pages
├── public/             # Static assets
├── model/              # ML model files
│   ├── trained_model/  # Saved model weights
│   └── preprocessing/  # Data preprocessing scripts
├── api/                # API endpoints
└── utils/              # Utility functions
```

## 🔍 Model Details

### Features Extracted
- Pen pressure variation
- Writing speed consistency
- Letter size progression
- Tremor frequency
- Spacing irregularities

### Training Data
The model was trained on publicly available datasets containing handwriting samples from both Parkinson's patients and healthy individuals.

## 🎓 Research Background

This project is based on research showing that handwriting analysis can be an effective non-invasive method for early Parkinson's Disease detection. Micrographia (small handwriting) is one of the earliest motor symptoms of the disease.

## 🌟 Future Enhancements

- [ ] Support for multiple handwriting tests (spiral, wave, sentence)
- [ ] Progress tracking for monitoring disease progression
- [ ] Integration with medical databases
- [ ] Mobile application development
- [ ] Multi-language support
- [ ] PDF report generation

## ⚠️ Disclaimer

**This tool is for educational and research purposes only.** It is not a substitute for professional medical diagnosis. Always consult qualified healthcare professionals for medical advice and diagnosis.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👩‍💻 Author

**Deepashree**
- GitHub: [@deepashree71](https://github.com/deepashree71)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/deepashreevenkateshan)

## 🙏 Acknowledgments

- Medical research papers on Parkinson's Disease and handwriting analysis
- Open-source machine learning community
- Healthcare professionals who provided domain expertise

## 📧 Contact

For questions, suggestions, or collaborations, please open an issue or reach out via LinkedIn.

---

⭐ If you find this project useful, please consider giving it a star!
