import selyaImg1 from '../assets/selya-chapter3.jpg';
import selyaImg2 from '../assets/selya-chapter2.jpg';
import selyaImg3 from '../assets/selya-chapter1.jpg';

export const SELYA_LESSON = {
  id: "human-physiology-selya",
  title: "Human Physiology: Dr. Selya's Adventure",
  subtitle: "An interactive journey inside the human body",
  chapters: [
    {
      id: 1,
      chapterTitle: "info 01",
      title: "The Tiny Guardian of Balance",
      concept: "Cellular Bioelectricity & Na⁺/K⁺ ATPase",
      image: selyaImg3,
      storyText: "Welcome to the cellular frontier! I'm Dr. Selya, and right here at the cell membrane lies the engine of human bioelectricity: the Na⁺/K⁺ ATPase pump. Every second, this transporter uses 1 ATP molecule to export 3 Na⁺ ions and import 2 K⁺ ions against their concentration gradients.",
      takeaway: "Maintains a resting membrane potential of -70mV—the electrical baseline required for action potentials in nerve impulses and thought processing.",
      formula: "3 Na⁺ (Out) + 2 K⁺ (In) + 1 ATP ➔ Bioelectric Balance (-70mV)"
    },
    {
      id: 2,
      chapterTitle: "info 02",
      title: "The River of Life",
      concept: "Circulatory Transport & Oxygen Delivery",
      image: selyaImg2,
      storyText: "Now, let's step inside the vascular highways! The heart acts as a dual-action muscular pump. Oxygen-poor blood is routed to the lungs for gas exchange, while oxygen-rich blood is propelled through a 100,000-kilometer network of arteries and capillaries.",
      takeaway: "Red Blood Cells (RBCs) packed with hemoglobin bind up to 4 O₂ molecules each, delivering oxygen directly to tissues for cellular respiration.",
      formula: "Heart Pump ➔ RBC Hemoglobin-O₂ Binding ➔ Systemic Delivery"
    },
    {
      id: 3,
      chapterTitle: "info 03",
      title: "The Control Room",
      concept: "Hypothalamic Thermoregulation & Homeostasis",
      image: selyaImg1,
      storyText: "We've reached the master command hub: the Hypothalamus in the brain. Serving as the body's neural thermostat, it strictly regulates internal core temperature around 37.0°C via negative feedback loops.",
      takeaway: "Triggers sweating & vasodilation when hot, or shivering & vasoconstriction when cold—unifying cellular electricity and circulation into equilibrium.",
      formula: "Stimulus ➔ Hypothalamic Sensor ➔ Negative Feedback ➔ Homeostasis (37°C)"
    }
  ]
};