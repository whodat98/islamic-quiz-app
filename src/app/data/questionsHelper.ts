import { Question, questions } from './questionIdMapper';
import { questionsArabic } from './questionsArabic';
import { Language } from '../context/LanguageContext';

export function getLocalizedQuestions(language: Language): Question[] {
  if (language === 'ar') {
    return questions.map(q => {
      const arabicData = questionsArabic[q.id as keyof typeof questionsArabic];
      if (arabicData) {
        return {
          ...q,
          question: arabicData.question,
          options: arabicData.options,
          explanation: arabicData.explanation,
        };
      }
      return q;
    });
  }
  return questions;
}

export function getLocalizedCategoryName(category: string, language: Language): string {
  if (language === 'ar') {
    const categoryMap: { [key: string]: string } = {
      'Quran': 'القرآن',
      'Hadith': 'الحديث',
      'Fiqh': 'الفقه',
      'Seerah': 'السيرة',
      'Geschichte': 'التاريخ',
      'Aqidah': 'العقيدة',
      'Alle': 'الكل',
    };
    return categoryMap[category] || category;
  }
  return category;
}
