import React, { useState } from 'react';
import { 
  FaPaperPlane, 
  FaCheckCircle, 
  FaUser, 
  FaEnvelope, 
  FaWhatsapp, 
  FaFlag, 
  FaCity, 
  FaShareAlt,
  FaLightbulb,
  FaShieldAlt
} from 'react-icons/fa';

interface FormData {
  fullName: string;
  email: string;
  whatsapp: string;
  nationality: string;
  city: string;
  socialMedia: string;
  motivation: string;
}

interface PromoAgentFormProps {
  onSuccess: () => void;
}

const PromoAgentForm: React.FC<PromoAgentFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    whatsapp: '',
    nationality: '',
    city: '',
    socialMedia: '',
    motivation: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formStep, setFormStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (formStep < 3) {
      setFormStep(formStep + 1);
    }
  };

  const prevStep = () => {
    if (formStep > 1) {
      setFormStep(formStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formStep < 3) {
      nextStep();
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:8000/promo-agent/application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        onSuccess();
      } else {
        setStatus('error');
        setErrorMessage('Une erreur est survenue lors de l\'envoi. Veuillez réessayer plus tard.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Impossible de contacter le serveur. Vérifiez votre connexion.');
    }
  };

  if (status === 'success') {
    return (
      <div className="form-success-container">
        <div className="success-animation">
          <FaCheckCircle className="success-icon" />
          <div className="success-checkmark"></div>
        </div>
        <div className="success-content">
          <h3>🎉 Candidature Envoyée avec Succès !</h3>
          <p className="success-message">
            Félicitations ! Votre profil a été soumis avec succès à notre équipe de recrutement.
          </p>
          <div className="success-details">
            <div className="detail-card">
              <FaEnvelope className="detail-icon" />
              <div>
                <h4>Confirmation Email</h4>
                <p>Vous recevrez un email de confirmation dans les 24h</p>
              </div>
            </div>
            <div className="detail-card">
              <FaWhatsapp className="detail-icon" />
              <div>
                <h4>Entretien WhatsApp</h4>
                <p>Notre recruteur vous contactera sous 48h</p>
              </div>
            </div>
            <div className="detail-card">
              <FaShieldAlt className="detail-icon" />
              <div>
                <h4>Processus de Vérification</h4>
                <p>Votre profil sera examiné dans les 72h</p>
              </div>
            </div>
          </div>
          <div className="success-actions">
            <button 
              className="btn-promo-secondary"
              onClick={() => {
                setStatus('idle');
                setFormStep(1);
                setFormData({
                  fullName: '',
                  email: '',
                  whatsapp: '',
                  nationality: '',
                  city: '',
                  socialMedia: '',
                  motivation: ''
                });
              }}
            >
              Postuler pour un ami
            </button>
            <a href="/" className="btn-promo-primary">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="multi-step-form">
      {/* Progress Bar */}
      <div className="form-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(formStep / 3) * 100}%` }}
          ></div>
        </div>
        <div className="progress-steps">
          {['Informations', 'Profil', 'Motivation'].map((step, index) => (
            <div 
              key={index} 
              className={`progress-step ${formStep > index + 1 ? 'completed' : ''} ${formStep === index + 1 ? 'active' : ''}`}
            >
              <div className="step-number">{index + 1}</div>
              <span className="step-label">{step}</span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="promo-agent-form">
        {/* Step 1: Personal Information */}
        {formStep === 1 && (
          <div className="form-step">
            <div className="step-header">
              <FaUser className="step-icon" />
              <h3>Informations Personnelles</h3>
              <p>Commencez par nous dire qui vous êtes</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="fullName">
                  <FaUser className="input-icon" />
                  Nom Complet *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Prénom et Nom"
                  className="form-input-promo"
                />
                <div className="input-hint">Comme indiqué sur votre pièce d'identité</div>
              </div>
              
              <div className="form-group-promo">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Email Professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="vous@domain.com"
                  className="form-input-promo"
                />
                <div className="input-hint">Nous enverrons la confirmation ici</div>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="whatsapp">
                  <FaWhatsapp className="input-icon" />
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  placeholder="+243 XX XXX XXXX"
                  className="form-input-promo"
                />
                <div className="input-hint">Notre recruteur vous contactera ici</div>
              </div>

              <div className="form-group-promo">
                <label htmlFor="nationality">
                  <FaFlag className="input-icon" />
                  Nationalité *
                </label>
                <input
                  type="text"
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Congolaise"
                  className="form-input-promo"
                />
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={nextStep}
                className="btn-promo-primary btn-next"
              >
                Suivant
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Location & Social Media */}
        {formStep === 2 && (
          <div className="form-step">
            <div className="step-header">
              <FaCity className="step-icon" />
              <h3>Localisation & Réseaux</h3>
              <p>Où êtes-vous et quel est votre réseau ?</p>
            </div>
            
            <div className="form-grid">
              <div className="form-group-promo">
                <label htmlFor="city">
                  <FaCity className="input-icon" />
                  Ville de Résidence *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Goma, Kinshasa, etc."
                  className="form-input-promo"
                />
              </div>

              <div className="form-group-promo">
                <label htmlFor="socialMedia">
                  <FaShareAlt className="input-icon" />
                  Réseaux Sociaux (Optionnel)
                </label>
                <input
                  type="text"
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  placeholder="Facebook, Instagram, TikTok, LinkedIn"
                  className="form-input-promo"
                />
                <div className="input-hint">
                  Liens ou noms d'utilisateur - Améliore vos chances d'acceptation
                </div>
              </div>
            </div>

            <div className="social-tips">
              <FaLightbulb className="tips-icon" />
              <div className="tips-content">
                <h4>Astuce pour augmenter vos chances</h4>
                <p>
                  Les agents avec un bon réseau social sont souvent acceptés plus rapidement.
                  Partagez vos comptes les plus actifs.
                </p>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn-promo-secondary"
              >
                ← Retour
              </button>
              <button 
                type="button" 
                onClick={nextStep}
                className="btn-promo-primary btn-next"
              >
                Suivant
                <span className="btn-arrow">→</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Motivation */}
        {formStep === 3 && (
          <div className="form-step">
            <div className="step-header">
              <FaLightbulb className="step-icon" />
              <h3>Votre Motivation</h3>
              <p>Convainquez-nous de votre potentiel</p>
            </div>
            
            <div className="form-group-promo">
              <label htmlFor="motivation">
                Pourquoi voulez-vous devenir Agent Numeric-Paper ?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                required
                placeholder={`Partagez avec nous :
• Votre expérience dans la vente ou le marketing
• Votre réseau et comment vous comptez l'utiliser
• Vos objectifs financiers
• Ce qui vous motive particulièrement chez Numeric-Paper
• Vos idées pour promouvoir nos services`}
                rows={8}
                className="form-textarea-promo"
              />
              <div className="textarea-hint">
                Minimum 200 caractères. Soyez précis et convaincant !
              </div>
            </div>

            <div className="form-counter">
              Caractères: {formData.motivation.length} / 500
            </div>

            {status === 'error' && (
              <div className="form-error">
                <div className="error-icon">⚠️</div>
                <div className="error-message">{errorMessage}</div>
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                onClick={prevStep}
                className="btn-promo-secondary"
              >
                ← Retour
              </button>
              <button 
                type="submit" 
                className="btn-promo-primary btn-submit"
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? (
                  <>
                    <span className="spinner"></span>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer ma candidature
                    <FaPaperPlane className="submit-icon" />
                  </>
                )}
              </button>
            </div>

            <div className="form-disclaimer">
              <FaShieldAlt className="disclaimer-icon" />
              <p>
                Vos informations sont sécurisées et ne seront jamais partagées avec des tiers.
                En soumettant ce formulaire, vous acceptez nos conditions d'utilisation.
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default PromoAgentForm;