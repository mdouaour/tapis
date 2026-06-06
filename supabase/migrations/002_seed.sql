-- =====================================================
-- Tapis.dz — Algerian Carpet Ecommerce Seed Data
-- Migration: 002_seed
-- =====================================================

-- =====================================================
-- CATEGORIES
-- =====================================================
INSERT INTO categories (id, name_ar, name_fr, slug, description_ar, description_fr, image) VALUES
(
  'a1b2c3d4-0001-4000-8000-000000000001',
  'سجاد صالون',
  'Tapis Salon',
  'salon-carpets',
  'تشكيلة راقية من سجاد الصالونات والمجالس بأفخم التصاميم العصرية والتقليدية، مناسبة لغرف المعيشة وغرف الضيوف.',
  'Une collection raffinée de tapis de salon et de séjour, designs modernes et traditionnels pour vos espaces de réception.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
),
(
  'a1b2c3d4-0002-4000-8000-000000000002',
  'سجاد غرف نوم',
  'Tapis Chambre',
  'bedroom-carpets',
  'سجاد ناعم وفاخر لغرف النوم يضفي أجواء من الدفء والراحة، متوفر بألوان هادئة ومقاسات مثالية.',
  'Des tapis doux et luxueux pour les chambres à coucher, créant une atmosphère chaleureuse et confortable.',
  'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80'
),
(
  'a1b2c3d4-0003-4000-8000-000000000003',
  'سجاد أطفال',
  'Tapis Enfant',
  'kids-carpets',
  'سجاد مرح وآمن للأطفال بتصاميم ملونة وشخصيات محبوبة، مصنوع من خامات صديقة للبشرة.',
  'Des tapis ludiques et sécurisés pour enfants, motifs colorés avec personnages adorés, matériaux doux et hypoallergéniques.',
  'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80'
),
(
  'a1b2c3d4-0004-4000-8000-000000000004',
  'سجاد ممرات',
  'Tapis Couloir',
  'hallway-runners',
  'سجاد طويل للممرات والدهاليز بتصاميم مميزة تناسب المساحات الضيقة وتضيف لمسة جمالية.',
  'Tapis longs pour couloirs et entrées, designs élégants pour espaces étroits, ajoutant une touche décorative.',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80'
),
(
  'a1b2c3d4-0005-4000-8000-000000000005',
  'سجاد خارجي',
  'Tapis Extérieur',
  'outdoor-carpets',
  'سجاد مقاوم للعوامل الجوية للشرفات والحدائق والباحات الخارجية، متين وسهل التنظيف.',
  'Tapis résistants aux intempéries pour balcons, jardins et terrasses. Robustes et faciles à nettoyer.',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80'
),
(
  'a1b2c3d4-0006-4000-8000-000000000006',
  'موكيت',
  'Moquette',
  'moquette',
  'موكيت فاخر للأرضيات بأعلى جودة، عازل للصحراء والحرارة، مثالي للمكاتب والمنازل.',
  'Moquette de luxe pour sols de haute qualité, isolation thermique et phonique, idéale pour bureaux et maisons.',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
);

-- =====================================================
-- PRODUCT IMAGES DATA (for product_images table)
-- Will be inserted after products
-- =====================================================

-- =====================================================
-- PRODUCTS — SALON CARPETS (5)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0001-4000-8000-000000000001',
  'سجاد صالون كلاسيك فاخر',
  'Tapis Salon Classique Luxe',
  'tapis-salon-classique-luxe',
  'سجاد صالون فاخر بتصميم كلاسيكي أنيق بنقوش تقليدية جميلة. مصنوع من أجود أنواع الصوف الطبيعي بنسبة 100%، يضفي على مجلسك أو صالونك فخامة وأصالة. متوفر بعدة مقاسات تناسب جميع المساحات.',
  'Tapis de salon luxueux au design classique élégant avec de magnifiques motifs traditionnels. Fabriqué en pure laine naturelle de première qualité, il apporte authenticité et raffinement à votre séjour. Disponible en plusieurs tailles.',
  45000.00, 39900.00, 12, TRUE,
  '[
    "https://images.unsplash.com/photo-1514993430470-ac8fc0e56c92?w=800&q=80",
    "https://images.unsplash.com/photo-1581858721551-1b5eef6c9f2e?w=800&q=80",
    "https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80"
  ]',
  '[
    {"name_ar": "أحمر بورغندي", "name_fr": "Rouge Bourgogne", "hex": "#800020"},
    {"name_ar": "عنّابي", "name_fr": "Bordeaux", "hex": "#4A0404"},
    {"name_ar": "بيج", "name_fr": "Beige", "hex": "#D4C5A9"},
    {"name_ar": "أزرق ملكي", "name_fr": "Bleu Royal", "hex": "#002366"}
  ]',
  '[
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 250, "length": 350, "unit": "cm", "label_ar": "250×350 سم", "label_fr": "250×350 cm"},
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"}
  ]',
  'a1b2c3d4-0001-4000-8000-000000000001'
),
(
  'b1c2d3e4-0002-4000-8000-000000000002',
  'سجاد صالون مودرن هندسي',
  'Tapis Salon Moderne Géométrique',
  'tapis-salon-moderne-geometrique',
  'سجاد صالون مودرن بتصميم هندسي عصري يجمع بين الأناقة والبساطة. مصنوع من البوليبروبيلين عالي الجودة المقاوم للبقع وسهل التنظيف. مثالي للصالونات العصرية والمجالس العصرية.',
  'Tapis de salon moderne au design géométrique contemporain alliant élégance et simplicité. Fabriqué en polypropylène de haute qualité, résistant aux taches et facile à nettoyer.',
  38000.00, NULL, 20, TRUE,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
  ]',
  '[
    {"name_ar": "رمادي فاتح", "name_fr": "Gris Clair", "hex": "#D3D3D3"},
    {"name_ar": "أسود وأبيض", "name_fr": "Noir et Blanc", "hex": "#F5F5F5"},
    {"name_ar": "أزرق رمادي", "name_fr": "Bleu Gris", "hex": "#6699CC"},
    {"name_ar": "بيج رملي", "name_fr": "Beige Sable", "hex": "#E8D5B7"}
  ]',
  '[
    {"width": 160, "length": 230, "unit": "cm", "label_ar": "160×230 سم", "label_fr": "160×230 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 240, "length": 340, "unit": "cm", "label_ar": "240×340 سم", "label_fr": "240×340 cm"},
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"}
  ]',
  'a1b2c3d4-0001-4000-8000-000000000001'
),
(
  'b1c2d3e4-0003-4000-8000-000000000003',
  'سجاد صالون تقليدي بربري',
  'Tapis Salon Berbère Traditionnel',
  'tapis-salon-berbere-traditionnel',
  'سجاد بربري تقليدي أصيل منسوج يدوياً على أيدي حرفيات جزائريات. نقوش أمازيغية أصيلة تعبر عن التراث الجزائري العريق. قطعة فنية فريدة تزين صالونك أو مجلسك.',
  'Tapis berbère traditionnel authentique tissé à la main par des artisanes algériennes. Motifs amazighs originaux exprimant le riche patrimoine algérien. Pièce d''art unique pour votre salon.',
  55000.00, NULL, 5, TRUE,
  '[
    "https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80",
    "https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80",
    "https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80",
    "https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80"
  ]',
  '[
    {"name_ar": "أحمر تقليدي", "name_fr": "Rouge Traditionnel", "hex": "#8B0000"},
    {"name_ar": "برتقالي تيراكوتا", "name_fr": "Orange Terre Cuite", "hex": "#CC5500"},
    {"name_ar": "بيج كريمي", "name_fr": "Beige Crème", "hex": "#F5E6CC"},
    {"name_ar": "أخضر زيتوني", "name_fr": "Vert Olive", "hex": "#556B2F"},
    {"name_ar": "أسود", "name_fr": "Noir", "hex": "#1A1A1A"}
  ]',
  '[
    {"width": 150, "length": 250, "unit": "cm", "label_ar": "150×250 سم", "label_fr": "150×250 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 250, "length": 350, "unit": "cm", "label_ar": "250×350 سم", "label_fr": "250×350 cm"}
  ]',
  'a1b2c3d4-0001-4000-8000-000000000001'
),
(
  'b1c2d3e4-0004-4000-8000-000000000004',
  'سجاد صالون كبير أوفر سايز',
  'Tapis Salon Oversize Grand',
  'tapis-salon-oversize-grand',
  'سجاد صالون كبير الحجم بمقاسات ممتازة تناسب الصالونات الواسعة والمجالس الكبيرة. تصميم فخم بألوان راقية يضفي على المكان هيبة وجمال.',
  'Tapis de salon grand format aux dimensions généreuses pour les grands salons et réceptions. Design somptueux aux couleurs raffinées donnant prestance et beauté à votre espace.',
  85000.00, 75000.00, 8, TRUE,
  '[
    "https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80",
    "https://images.unsplash.com/photo-1594212690571-589b2e4e9542?w=800&q=80",
    "https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80"
  ]',
  '[
    {"name_ar": "كريم", "name_fr": "Crème", "hex": "#FFFDD0"},
    {"name_ar": "ذهبي", "name_fr": "Doré", "hex": "#D4AF37"},
    {"name_ar": "رمادي غامق", "name_fr": "Gris Anthracite", "hex": "#2F2F2F"},
    {"name_ar": "كحلي", "name_fr": "Bleu Marine", "hex": "#000080"}
  ]',
  '[
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"},
    {"width": 350, "length": 450, "unit": "cm", "label_ar": "350×450 سم", "label_fr": "350×450 cm"},
    {"width": 400, "length": 500, "unit": "cm", "label_ar": "400×500 سم", "label_fr": "400×500 cm"}
  ]',
  'a1b2c3d4-0001-4000-8000-000000000001'
),
(
  'b1c2d3e4-0005-4000-8000-000000000005',
  'سجاد صالون حرير فاخر',
  'Tapis Salon Soie Prestige',
  'tapis-salon-soie-prestige',
  'سجاد حرير فاخر من أجود أنواع الحرير الطبيعي المستورد. لمعان استثنائي ونعومة فائقة. نقوش يدوية دقيقة تجعل من هذا السجاد تحفة فنية حقيقية تناسب أفخم الصالونات.',
  'Tapis en soie de luxe de la plus haute qualité. Brillance exceptionnelle et douceur incomparable. Motifs tissés à la main avec une précision remarquable, véritable œuvre d''art pour les salons les plus prestigieux.',
  120000.00, NULL, 3, TRUE,
  '[
    "https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80",
    "https://images.unsplash.com/photo-1588601507911-4f4a5f9503b1?w=800&q=80",
    "https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
  ]',
  '[
    {"name_ar": "عنّابي غامق", "name_fr": "Bordeaux Foncé", "hex": "#4A0404"},
    {"name_ar": "ذهابي فاتح", "name_fr": "Or Clair", "hex": "#F0E68C"},
    {"name_ar": "أزرق سماوي", "name_fr": "Bleu Ciel", "hex": "#87CEEB"},
    {"name_ar": "أخضر زمردي", "name_fr": "Vert Émeraude", "hex": "#50C878"},
    {"name_ar": "عاجي", "name_fr": "Ivoire", "hex": "#FFFFF0"}
  ]',
  '[
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 250, "length": 350, "unit": "cm", "label_ar": "250×350 سم", "label_fr": "250×350 cm"},
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"}
  ]',
  'a1b2c3d4-0001-4000-8000-000000000001'
);

-- =====================================================
-- PRODUCTS — BEDROOM CARPETS (4)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0011-4000-8000-000000000001',
  'سجاد غرفة نوم مودرن',
  'Tapis Chambre Moderne',
  'tapis-chambre-moderne',
  'سجاد غرفة نوم بتصميم مودرن أنيق وناعم الملمس. يضفي أجواء من الهدوء والاسترخاء على غرفة نومك. مصنوع من ألياف ناعمة مضادة للحساسية.',
  'Tapis de chambre moderne au design élégant et doux au toucher. Apporte une atmosphère de calme et de relaxation dans votre chambre. Fabriqué en fibres douces anti-allergènes.',
  25000.00, NULL, 25, TRUE,
  '[
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
  ]',
  '[
    {"name_ar": "رمادي فاتح", "name_fr": "Gris Clair", "hex": "#D3D3D3"},
    {"name_ar": "لابندي", "name_fr": "Lavande", "hex": "#B57EDC"},
    {"name_ar": "أزرق فاتح", "name_fr": "Bleu Clair", "hex": "#ADD8E6"},
    {"name_ar": "بيج وردي", "name_fr": "Beige Rosé", "hex": "#F5D5CB"}
  ]',
  '[
    {"width": 140, "length": 200, "unit": "cm", "label_ar": "140×200 سم", "label_fr": "140×200 cm"},
    {"width": 160, "length": 230, "unit": "cm", "label_ar": "160×230 سم", "label_fr": "160×230 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 80, "length": 150, "unit": "cm", "label_ar": "80×150 سم", "label_fr": "80×150 cm"}
  ]',
  'a1b2c3d4-0002-4000-8000-000000000002'
),
(
  'b1c2d3e4-0012-4000-8000-000000000002',
  'سجاد غرفة نوم ناعم فاخر شاغي',
  'Tapis Chambre Doux Luxe Shaggy',
  'tapis-chambre-shaggy-luxe',
  'سجاد شاغي فاخر بطول وبر 4 سم لملمس فائق النعومة. مثالي لغرف النوم حيث يمنحك إحساساً لا يقاوم بالدفء والراحة عند المشي عليه حافي القدمين.',
  'Tapis shaggy de luxe à poils longs de 4 cm pour un toucher ultra-doux. Idéal pour les chambres, il offre une sensation irrésistible de chaleur et de confort lorsque vous marchez pieds nus.',
  32000.00, 28000.00, 15, FALSE,
  '[
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
  ]',
  '[
    {"name_ar": "أبيض", "name_fr": "Blanc", "hex": "#FFFFFF"},
    {"name_ar": "بيج فاتح", "name_fr": "Beige Clair", "hex": "#F5F0E1"},
    {"name_ar": "رمادي دخاني", "name_fr": "Gris Fumé", "hex": "#696969"},
    {"name_ar": "زهري ناعم", "name_fr": "Rose Doux", "hex": "#FFB6C1"},
    {"name_ar": "أزرق جليدي", "name_fr": "Bleu Glacial", "hex": "#E0F0FF"}
  ]',
  '[
    {"width": 140, "length": 200, "unit": "cm", "label_ar": "140×200 سم", "label_fr": "140×200 cm"},
    {"width": 160, "length": 230, "unit": "cm", "label_ar": "160×230 سم", "label_fr": "160×230 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"}
  ]',
  'a1b2c3d4-0002-4000-8000-000000000002'
),
(
  'b1c2d3e4-0013-4000-8000-000000000003',
  'سجاد غرفة نوم دائري',
  'Tapis Chambre Rond',
  'tapis-chambre-rond',
  'سجاد دائري أنيق لغرف النوم بتصميم عصري جذاب. ممتاز لتحديد مساحة السرير أو منطقة الجلوس في غرفة النوم. يضفي لمسة فنية راقية.',
  'Tapis rond élégant pour chambre au design moderne et attrayant. Parfait pour délimiter l''espace du lit ou le coin salon dans la chambre. Apporte une touche artistique raffinée.',
  22000.00, NULL, 18, FALSE,
  '[
    "https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80",
    "https://images.unsplash.com/photo-1514993430470-ac8fc0e56c92?w=800&q=80",
    "https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80"
  ]',
  '[
    {"name_ar": "رمادي", "name_fr": "Gris", "hex": "#808080"},
    {"name_ar": "كحلي", "name_fr": "Bleu Marine", "hex": "#000080"},
    {"name_ar": "زهري غامق", "name_fr": "Rose Foncé", "hex": "#E75480"},
    {"name_ar": "بيج", "name_fr": "Beige", "hex": "#D4C5A9"}
  ]',
  '[
    {"width": 120, "length": 120, "unit": "cm", "label_ar": "قطر 120 سم", "label_fr": "Diam. 120 cm"},
    {"width": 150, "length": 150, "unit": "cm", "label_ar": "قطر 150 سم", "label_fr": "Diam. 150 cm"},
    {"width": 200, "length": 200, "unit": "cm", "label_ar": "قطر 200 سم", "label_fr": "Diam. 200 cm"}
  ]',
  'a1b2c3d4-0002-4000-8000-000000000002'
),
(
  'b1c2d3e4-0014-4000-8000-000000000004',
  'طقم سجاد غرفة نوم 3 قطع',
  'Lot Tapis Chambre 3 Pièces',
  'lot-tapis-chambre-3-pieces',
  'طقم سجاد غرفة نوم متكامل من 3 قطع: سجاد كبير بجانب السرير، وقطعتان صغيرتان على الجانبين. تصميم منسق يمنح غرفة نومك مظهراً متناسقاً وأنيقاً.',
  'Lot de 3 tapis pour chambre: un grand tapis au pied du lit et deux petits tapis de chevet. Design coordonné donnant à votre chambre un aspect harmonieux et élégant.',
  40000.00, 35000.00, 10, FALSE,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
  ]',
  '[
    {"name_ar": "أزرق داكن", "name_fr": "Bleu Foncé", "hex": "#00008B"},
    {"name_ar": "رمادي بيرل", "name_fr": "Gris Perle", "hex": "#C0C0C0"},
    {"name_ar": "بيج عاجي", "name_fr": "Beige Ivoire", "hex": "#F5E6D0"},
    {"name_ar": "أخضر نعناعي", "name_fr": "Vert Menthe", "hex": "#98FF98"}
  ]',
  '[
    {"width": 160, "length": 230, "unit": "cm", "label_ar": "160×230 سم + 2× 50×80 سم", "label_fr": "160×230 cm + 2× 50×80 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم + 2× 60×90 سم", "label_fr": "200×300 cm + 2× 60×90 cm"}
  ]',
  'a1b2c3d4-0002-4000-8000-000000000002'
);

-- =====================================================
-- PRODUCTS — KIDS CARPETS (3)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0021-4000-8000-000000000001',
  'سجاد أطفال ملون بالرسومات',
  'Tapis Enfant Coloré Illustré',
  'tapis-enfant-colorie-illustre',
  'سجاد أطفال مرح بتصاميم ملونة ورسومات جذابة تنمي خيال الطفل. مصنوع من ألياف ناعمة وآمنة على بشرة الأطفال. مضاد للبكتيريا وسهل التنظيف.',
  'Tapis enfant ludique aux designs colorés et illustrations attrayantes qui stimulent l''imagination. Fabriqué en fibres douces et sûres pour la peau des enfants. Antibactérien et facile à nettoyer.',
  15000.00, NULL, 30, TRUE,
  '[
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80"
  ]',
  '[
    {"name_ar": "متعدد الألوان", "name_fr": "Multicolore", "hex": "#FF6B6B"},
    {"name_ar": "أزرق وأصفر", "name_fr": "Bleu et Jaune", "hex": "#4169E1"},
    {"name_ar": "أخضر وبرتقالي", "name_fr": "Vert et Orange", "hex": "#32CD32"},
    {"name_ar": "زهري وبنفسجي", "name_fr": "Rose et Violet", "hex": "#FF69B4"}
  ]',
  '[
    {"width": 100, "length": 150, "unit": "cm", "label_ar": "100×150 سم", "label_fr": "100×150 cm"},
    {"width": 120, "length": 180, "unit": "cm", "label_ar": "120×180 سم", "label_fr": "120×180 cm"},
    {"width": 140, "length": 200, "unit": "cm", "label_ar": "140×200 سم", "label_fr": "140×200 cm"}
  ]',
  'a1b2c3d4-0003-4000-8000-000000000003'
),
(
  'b1c2d3e4-0022-4000-8000-000000000002',
  'سجاد أطفال شخصيات كرتون',
  'Tapis Enfant Personnages Cartoon',
  'tapis-enfant-personnages-cartoon',
  'سجاد أطفال بشخصيات كرتونية محبوبة تجعل وقت اللعب أكثر متعة. ناعم وآمن، مناسب للحضانة وغرفة الأطفال. مقاوم للبقع وسهل الغسل.',
  'Tapis enfant avec personnages de dessins animés adorés rendant le temps de jeu plus amusant. Doux et sûr, adapté à la crèche et à la chambre d''enfant. Résistant aux taches et lavable.',
  18000.00, 15500.00, 22, FALSE,
  '[
    "https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80",
    "https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80",
    "https://images.unsplash.com/photo-1581858721551-1b5eef6c9f2e?w=800&q=80"
  ]',
  '[
    {"name_ar": "متعدد الألوان زاهي", "name_fr": "Multicolore Vif", "hex": "#FF4500"},
    {"name_ar": "أزرق سماوي", "name_fr": "Bleu Ciel", "hex": "#87CEEB"},
    {"name_ar": "زهري فاتح", "name_fr": "Rose Clair", "hex": "#FFB6C1"},
    {"name_ar": "أصفر", "name_fr": "Jaune", "hex": "#FFD700"}
  ]',
  '[
    {"width": 100, "length": 150, "unit": "cm", "label_ar": "100×150 سم", "label_fr": "100×150 cm"},
    {"width": 140, "length": 200, "unit": "cm", "label_ar": "140×200 سم", "label_fr": "140×200 cm"},
    {"width": 80, "length": 120, "unit": "cm", "label_ar": "80×120 سم", "label_fr": "80×120 cm"},
    {"width": 200, "length": 250, "unit": "cm", "label_ar": "200×250 سم", "label_fr": "200×250 cm"}
  ]',
  'a1b2c3d4-0003-4000-8000-000000000003'
),
(
  'b1c2d3e4-0023-4000-8000-000000000003',
  'سجاد أطفال تعليمي حروف وأرقام',
  'Tapis Enfant Éducatif Chiffres et Lettres',
  'tapis-enfant-educatif-lettres-chiffres',
  'سجاد تعليمي تفاعلي للأطفال يساعد على تعلم الحروف والأرقام بطريقة مرحة. ألوان جذابة ومقاس مناسب لغرفة اللعب. مصنوع من الفوم عالي الكثافة وآمن.',
  'Tapis éducatif interactif pour enfants aidant à apprendre les lettres et les chiffres de manière ludique. Couleurs attrayantes, taille adaptée à la salle de jeux. Fabriqué en mousse haute densité sécurisée.',
  12000.00, NULL, 35, FALSE,
  '[
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80"
  ]',
  '[
    {"name_ar": "أحمر وأزرق", "name_fr": "Rouge et Bleu", "hex": "#FF3333"},
    {"name_ar": "أخضر وأصفر", "name_fr": "Vert et Jaune", "hex": "#33CC33"},
    {"name_ar": "أرجواني وبرتقالي", "name_fr": "Violet et Orange", "hex": "#9933FF"}
  ]',
  '[
    {"width": 100, "length": 150, "unit": "cm", "label_ar": "100×150 سم", "label_fr": "100×150 cm"},
    {"width": 120, "length": 180, "unit": "cm", "label_ar": "120×180 سم", "label_fr": "120×180 cm"},
    {"width": 150, "length": 200, "unit": "cm", "label_ar": "150×200 سم", "label_fr": "150×200 cm"}
  ]',
  'a1b2c3d4-0003-4000-8000-000000000003'
);

-- =====================================================
-- PRODUCTS — HALLWAY RUNNERS (3)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0031-4000-8000-000000000001',
  'سجاد ممر طويل كلاسيك',
  'Tapis Couloir Long Classique',
  'tapis-couloir-long-classique',
  'سجاد ممر طويل بتصميم كلاسيكي أنيق يناسب الدهاليز والممرات الطويلة. نقشة تقليدية جميلة تضفي عمقاً وجمالاً على المساحة. مقاوم للاهتراء ومناسب للحركة الكثيفة.',
  'Tapis de couloir long au design classique élégant adapté aux entrées et longs couloirs. Magnifique motif traditionnel donnant profondeur et beauté à l''espace. Résistant à l''usure pour zones à fort passage.',
  28000.00, NULL, 14, FALSE,
  '[
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80"
  ]',
  '[
    {"name_ar": "أحمر وذهبي", "name_fr": "Rouge et Doré", "hex": "#CC0000"},
    {"name_ar": "كحلي وفضي", "name_fr": "Bleu Marine et Argent", "hex": "#000080"},
    {"name_ar": "بيج وبنّي", "name_fr": "Beige et Marron", "hex": "#D4C5A9"},
    {"name_ar": "أخضر زيتوني", "name_fr": "Vert Olive", "hex": "#556B2F"}
  ]',
  '[
    {"width": 60, "length": 200, "unit": "cm", "label_ar": "60×200 سم", "label_fr": "60×200 cm"},
    {"width": 70, "length": 250, "unit": "cm", "label_ar": "70×250 سم", "label_fr": "70×250 cm"},
    {"width": 80, "length": 300, "unit": "cm", "label_ar": "80×300 سم", "label_fr": "80×300 cm"},
    {"width": 80, "length": 400, "unit": "cm", "label_ar": "80×400 سم", "label_fr": "80×400 cm"}
  ]',
  'a1b2c3d4-0004-4000-8000-000000000004'
),
(
  'b1c2d3e4-0032-4000-8000-000000000002',
  'سجاد ممر مودرن خطوط',
  'Tapis Couloir Moderne Rayures',
  'tapis-couloir-moderne-rayures',
  'سجاد ممر مودرن بتصميم خطوط هندسية عصرية. يمنح الممر مظهراً أطول وأكثر اتساعاً. ألوان محايدة تناسب الديكورات الحديثة.',
  'Tapis de couloir moderne aux lignes géométriques contemporaines. Donne une apparence plus longue et plus large au couloir. Couleurs neutres s''adaptant aux décorations modernes.',
  24000.00, 21000.00, 20, TRUE,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
  ]',
  '[
    {"name_ar": "رمادي وأبيض", "name_fr": "Gris et Blanc", "hex": "#A9A9A9"},
    {"name_ar": "أسود وبيج", "name_fr": "Noir et Beige", "hex": "#2F2F2F"},
    {"name_ar": "أزرق رمادي", "name_fr": "Bleu Grisé", "hex": "#6B7B8D"},
    {"name_ar": "كحلي وذهبي", "name_fr": "Bleu Marine et Doré", "hex": "#000080"}
  ]',
  '[
    {"width": 60, "length": 200, "unit": "cm", "label_ar": "60×200 سم", "label_fr": "60×200 cm"},
    {"width": 70, "length": 250, "unit": "cm", "label_ar": "70×250 سم", "label_fr": "70×250 cm"},
    {"width": 80, "length": 300, "unit": "cm", "label_ar": "80×300 سم", "label_fr": "80×300 cm"},
    {"width": 90, "length": 350, "unit": "cm", "label_ar": "90×350 سم", "label_fr": "90×350 cm"},
    {"width": 80, "length": 500, "unit": "cm", "label_ar": "80×500 سم", "label_fr": "80×500 cm"}
  ]',
  'a1b2c3d4-0004-4000-8000-000000000004'
),
(
  'b1c2d3e4-0033-4000-8000-000000000003',
  'سجاد ممر تقليدي جزائري',
  'Tapis Couloir Traditionnel Algérien',
  'tapis-couloir-traditionnel-algerien',
  'سجاد ممر تقليدي جزائري بنقوش أمازيغية أصيلة. منسوج يدوياً من صوف طبيعي عالي الجودة. قطعة تراثية تضفي على منزلك لمسة جزائرية دافئة.',
  'Tapis de couloir traditionnel algérien aux motifs amazighs authentiques. Tissé à la main en laine naturelle de haute qualité. Pièce de patrimoine apportant une touche algérienne chaleureuse à votre maison.',
  30000.00, NULL, 7, FALSE,
  '[
    "https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80",
    "https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80",
    "https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80",
    "https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80"
  ]',
  '[
    {"name_ar": "أحمر تقليدي", "name_fr": "Rouge Traditionnel", "hex": "#8B2500"},
    {"name_ar": "برتقالي مائل للأحمر", "name_fr": "Rouge Orangé", "hex": "#CC5500"},
    {"name_ar": "أسود", "name_fr": "Noir", "hex": "#1A1A1A"},
    {"name_ar": "كريم", "name_fr": "Crème", "hex": "#FFFDD0"}
  ]',
  '[
    {"width": 70, "length": 200, "unit": "cm", "label_ar": "70×200 سم", "label_fr": "70×200 cm"},
    {"width": 80, "length": 250, "unit": "cm", "label_ar": "80×250 سم", "label_fr": "80×250 cm"},
    {"width": 80, "length": 300, "unit": "cm", "label_ar": "80×300 سم", "label_fr": "80×300 cm"}
  ]',
  'a1b2c3d4-0004-4000-8000-000000000004'
);

-- =====================================================
-- PRODUCTS — OUTDOOR CARPETS (3)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0041-4000-8000-000000000001',
  'سجاد خارجي مقاوم للعوامل',
  'Tapis Extérieur Résistant Intempéries',
  'tapis-exterieur-resistant-intemperies',
  'سجاد خارجي متين مقاوم للماء وأشعة الشمس والعوامل الجوية. مصنوع من البوليبروبيلين المعالج بالأشعة فوق البنفسجية. مثالي للشرفات والتراسات والباحات الخارجية.',
  'Tapis extérieur robuste résistant à l''eau, au soleil et aux intempéries. Fabriqué en polypropylène traité anti-UV. Idéal pour les balcons, terrasses et patios.',
  18000.00, NULL, 25, TRUE,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  ]',
  '[
    {"name_ar": "أخضر عشبي", "name_fr": "Vert Herbe", "hex": "#228B22"},
    {"name_ar": "رمادي حجري", "name_fr": "Gris Pierre", "hex": "#8B8B83"},
    {"name_ar": "بيج رملي", "name_fr": "Beige Sable", "hex": "#E8D5B7"},
    {"name_ar": "تركواز", "name_fr": "Turquoise", "hex": "#40E0D0"},
    {"name_ar": "بني ترابي", "name_fr": "Brun Terre", "hex": "#8B4513"}
  ]',
  '[
    {"width": 150, "length": 200, "unit": "cm", "label_ar": "150×200 سم", "label_fr": "150×200 cm"},
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 250, "length": 350, "unit": "cm", "label_ar": "250×350 سم", "label_fr": "250×350 cm"},
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"}
  ]',
  'a1b2c3d4-0005-4000-8000-000000000005'
),
(
  'b1c2d3e4-0042-4000-8000-000000000002',
  'سجاد شرفة مودرن',
  'Tapis Balcon Moderne',
  'tapis-balcon-moderne',
  'سجاد شرفة أنيق بتصميم مودرن يضفي لمسة جمالية على مساحتك الخارجية. خفيف الوزن وسهل الحمل والتنظيف. مثالي للشرفات الصغيرة والمتوسطة.',
  'Tapis de balcon élégant au design moderne apportant une touche esthétique à votre espace extérieur. Léger, facile à transporter et à nettoyer. Parfait pour les petits et moyens balcons.',
  14000.00, 12000.00, 30, FALSE,
  '[
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80"
  ]',
  '[
    {"name_ar": "أخضر فاتح", "name_fr": "Vert Clair", "hex": "#90EE90"},
    {"name_ar": "أزرق بحري", "name_fr": "Bleu Océan", "hex": "#006994"},
    {"name_ar": "رمادي فاتح", "name_fr": "Gris Clair", "hex": "#D3D3D3"},
    {"name_ar": "أصفر شمسي", "name_fr": "Jaune Soleil", "hex": "#FFD700"},
    {"name_ar": "بني فاتح", "name_fr": "Brun Clair", "hex": "#A0522D"}
  ]',
  '[
    {"width": 80, "length": 150, "unit": "cm", "label_ar": "80×150 سم", "label_fr": "80×150 cm"},
    {"width": 100, "length": 200, "unit": "cm", "label_ar": "100×200 سم", "label_fr": "100×200 cm"},
    {"width": 120, "length": 180, "unit": "cm", "label_ar": "120×180 سم", "label_fr": "120×180 cm"},
    {"width": 150, "length": 200, "unit": "cm", "label_ar": "150×200 سم", "label_fr": "150×200 cm"}
  ]',
  'a1b2c3d4-0005-4000-8000-000000000005'
),
(
  'b1c2d3e4-0043-4000-8000-000000000003',
  'سجاد حديقة كبير',
  'Tapis Jardin Grand',
  'tapis-jardin-grand',
  'سجاد حديقة كبير الحجم مناسب للمساحات الخضراء الواسعة والباحات. مقاوم للعفن والرطوبة والحشرات. تصميم طبيعي يندمج مع جمال الحديقة.',
  'Grand tapis de jardin adapté aux grands espaces verts et patios. Résistant à la moisissure, à l''humidité et aux insectes. Design naturel s''intégrant à la beauté du jardin.',
  22000.00, NULL, 12, FALSE,
  '[
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  ]',
  '[
    {"name_ar": "أخضر غامق", "name_fr": "Vert Foncé", "hex": "#006400"},
    {"name_ar": "بني غامق", "name_fr": "Brun Foncé", "hex": "#5C4033"},
    {"name_ar": "بيج", "name_fr": "Beige", "hex": "#D4C5A9"},
    {"name_ar": "رمادي", "name_fr": "Gris", "hex": "#808080"}
  ]',
  '[
    {"width": 200, "length": 300, "unit": "cm", "label_ar": "200×300 سم", "label_fr": "200×300 cm"},
    {"width": 250, "length": 350, "unit": "cm", "label_ar": "250×350 سم", "label_fr": "250×350 cm"},
    {"width": 300, "length": 400, "unit": "cm", "label_ar": "300×400 سم", "label_fr": "300×400 cm"}
  ]',
  'a1b2c3d4-0005-4000-8000-000000000005'
);

-- =====================================================
-- PRODUCTS — MOQUETTE (2)
-- =====================================================
INSERT INTO products (id, name_ar, name_fr, slug, description_ar, description_fr, price, sale_price, stock, featured, images, colors, dimensions, category_id) VALUES
(
  'b1c2d3e4-0051-4000-8000-000000000001',
  'موكيت فاخر سميك',
  'Moquette Luxe Épaisse',
  'moquette-luxe-epaisse',
  'موكيت فاخر عالي الكثافة بسمك 12 مم. عازل ممتاز للصوت والحرارة. ناعم الملمس ومريح للمشي. مناسب لغرف النوم والمكاتب وصالات الاستقبال. متوفر بعدة ألوان راقية.',
  'Moquette de luxe haute densité de 12 mm d''épaisseur. Excellente isolation phonique et thermique. Douce au toucher et confortable pour la marche. Idéale pour chambres, bureaux et salles de réception.',
  8000.00, 6500.00, 50, FALSE,
  '[
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
  ]',
  '[
    {"name_ar": "بيج فاتح", "name_fr": "Beige Clair", "hex": "#F5F0E1"},
    {"name_ar": "رمادي بيرل", "name_fr": "Gris Perle", "hex": "#C0C0C0"},
    {"name_ar": "كحلي", "name_fr": "Bleu Marine", "hex": "#000080"},
    {"name_ar": "بني شوكولاتة", "name_fr": "Marron Chocolat", "hex": "#3E2723"},
    {"name_ar": "أخضر غابي", "name_fr": "Vert Forêt", "hex": "#228B22"}
  ]',
  '[
    {"width": 400, "length": 500, "unit": "cm", "label_ar": "4×5 متر (20 م²)", "label_fr": "4×5 m (20 m²)"},
    {"width": 500, "length": 500, "unit": "cm", "label_ar": "5×5 متر (25 م²)", "label_fr": "5×5 m (25 m²)"},
    {"width": 400, "length": 600, "unit": "cm", "label_ar": "4×6 متر (24 م²)", "label_fr": "4×6 m (24 m²)"}
  ]',
  'a1b2c3d4-0006-4000-8000-000000000006'
),
(
  'b1c2d3e4-0052-4000-8000-000000000002',
  'موكيت مودرن للمكاتب',
  'Moquette Moderne pour Bureaux',
  'moquette-moderne-bureaux',
  'موكيت مودرن مناسب للمكاتب والمساحات التجارية. مقاوم للبقع وسهل الصيانة. تصميم أنيق وعصري بألوان محايدة تتناسب مع بيئة العمل. ضد البكتيريا والحشرات.',
  'Moquette moderne adaptée aux bureaux et espaces commerciaux. Résistante aux taches et facile d''entretien. Design élégant et contemporain aux couleurs neutres adaptées à l''environnement professionnel. Antibactérienne.',
  6000.00, NULL, 40, FALSE,
  '[
    "https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  ]',
  '[
    {"name_ar": "رمادي غامق", "name_fr": "Gris Foncé", "hex": "#36454F"},
    {"name_ar": "أزرق رمادي", "name_fr": "Bleu Gris", "hex": "#6699CC"},
    {"name_ar": "بيج", "name_fr": "Beige", "hex": "#D4C5A9"},
    {"name_ar": "أسود", "name_fr": "Noir", "hex": "#1A1A1A"}
  ]',
  '[
    {"width": 400, "length": 500, "unit": "cm", "label_ar": "4×5 متر (20 م²)", "label_fr": "4×5 m (20 m²)"},
    {"width": 500, "length": 500, "unit": "cm", "label_ar": "5×5 متر (25 م²)", "label_fr": "5×5 m (25 m²)"},
    {"width": 500, "length": 600, "unit": "cm", "label_ar": "5×6 متر (30 م²)", "label_fr": "5×6 m (30 m²)"}
  ]',
  'a1b2c3d4-0006-4000-8000-000000000006'
);

-- =====================================================
-- PRODUCT IMAGES (normalized table)
-- =====================================================
INSERT INTO product_images (id, product_id, url, alt_ar, alt_fr, sort_order) VALUES
-- Product 1: Salon Classique Luxe
('c1d2e3f4-0001-4000-8000-000000000001', 'b1c2d3e4-0001-4000-8000-000000000001', 'https://images.unsplash.com/photo-1514993430470-ac8fc0e56c92?w=800&q=80', 'سجاد صالون كلاسيك فاخر أحمر', 'Tapis salon classique luxe rouge', 0),
('c1d2e3f4-0002-4000-8000-000000000002', 'b1c2d3e4-0001-4000-8000-000000000001', 'https://images.unsplash.com/photo-1581858721551-1b5eef6c9f2e?w=800&q=80', 'سجاد صالون تقليدي عنّابي', 'Tapis salon traditionnel bordeaux', 1),
('c1d2e3f4-0003-4000-8000-000000000003', 'b1c2d3e4-0001-4000-8000-000000000001', 'https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80', 'سجاد صالون مغربي أصيل', 'Tapis salon marocain authentique', 2),

-- Product 2: Salon Moderne Géométrique
('c1d2e3f4-0004-4000-8000-000000000004', 'b1c2d3e4-0002-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'سجاد صالون مودرن رمادي', 'Tapis salon moderne gris', 0),
('c1d2e3f4-0005-4000-8000-000000000005', 'b1c2d3e4-0002-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد صالون عصري', 'Tapis salon contemporain', 1),
('c1d2e3f4-0006-4000-8000-000000000006', 'b1c2d3e4-0002-4000-8000-000000000002', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'سجاد صالون بيج', 'Tapis salon beige', 2),

-- Product 3: Berbère Traditionnel
('c1d2e3f4-0007-4000-8000-000000000007', 'b1c2d3e4-0003-4000-8000-000000000003', 'https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80', 'سجاد بربري تقليدي', 'Tapis berbère traditionnel', 0),
('c1d2e3f4-0008-4000-8000-000000000008', 'b1c2d3e4-0003-4000-8000-000000000003', 'https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80', 'سجاد أمازيغي أصيل', 'Tapis amazigh authentique', 1),
('c1d2e3f4-0009-4000-8000-000000000009', 'b1c2d3e4-0003-4000-8000-000000000003', 'https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80', 'سجاد بربري أحمر', 'Tapis berbère rouge', 2),
('c1d2e3f4-000a-4000-8000-00000000000a', 'b1c2d3e4-0003-4000-8000-000000000003', 'https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80', 'سجاد بربري منسوج يدوياً', 'Tapis berbère tissé main', 3),

-- Product 4: Oversize Grand
('c1d2e3f4-000b-4000-8000-00000000000b', 'b1c2d3e4-0004-4000-8000-000000000004', 'https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80', 'سجاد صالون كبير كريمي', 'Tapis salon grand crème', 0),
('c1d2e3f4-000c-4000-8000-00000000000c', 'b1c2d3e4-0004-4000-8000-000000000004', 'https://images.unsplash.com/photo-1594212690571-589b2e4e9542?w=800&q=80', 'سجاد صالون كبير ذهبي', 'Tapis salon grand doré', 1),
('c1d2e3f4-000d-4000-8000-00000000000d', 'b1c2d3e4-0004-4000-8000-000000000004', 'https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80', 'سجاد صالون أوفر سايز', 'Tapis salon oversize', 2),

-- Product 5: Soie Prestige
('c1d2e3f4-000e-4000-8000-00000000000e', 'b1c2d3e4-0005-4000-8000-000000000005', 'https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80', 'سجاد حرير فاخر عنّابي', 'Tapis soie luxe bordeaux', 0),
('c1d2e3f4-000f-4000-8000-00000000000f', 'b1c2d3e4-0005-4000-8000-000000000005', 'https://images.unsplash.com/photo-1588601507911-4f4a5f9503b1?w=800&q=80', 'سجاد حرير يدوي', 'Tapis soie fait main', 1),
('c1d2e3f4-0010-4000-8000-000000000010', 'b1c2d3e4-0005-4000-8000-000000000005', 'https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80', 'سجاد حرير فاخر ذهبي', 'Tapis soie luxe doré', 2),
('c1d2e3f4-0011-4000-8000-000000000011', 'b1c2d3e4-0005-4000-8000-000000000005', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 'سجاد حرير تقليدي', 'Tapis soie traditionnel', 3),

-- Product 6: Chambre Moderne
('c1d2e3f4-0012-4000-8000-000000000012', 'b1c2d3e4-0011-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد غرفة نوم رمادي', 'Tapis chambre gris', 0),
('c1d2e3f4-0013-4000-8000-000000000013', 'b1c2d3e4-0011-4000-8000-000000000001', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'سجاد غرفة نوم ناعم', 'Tapis chambre doux', 1),
('c1d2e3f4-0014-4000-8000-000000000014', 'b1c2d3e4-0011-4000-8000-000000000001', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'سجاد غرفة نوم بيج', 'Tapis chambre beige', 2),

-- Product 7: Shaggy Luxe
('c1d2e3f4-0015-4000-8000-000000000015', 'b1c2d3e4-0012-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد شاغي أبيض', 'Tapis shaggy blanc', 0),
('c1d2e3f4-0016-4000-8000-000000000016', 'b1c2d3e4-0012-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80', 'سجاد شاغي فاخر', 'Tapis shaggy luxe', 1),
('c1d2e3f4-0017-4000-8000-000000000017', 'b1c2d3e4-0012-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', 'سجاد غرفة نوم وبر طويل', 'Tapis chambre poils longs', 2),

-- Product 8: Chambre Rond
('c1d2e3f4-0018-4000-8000-000000000018', 'b1c2d3e4-0013-4000-8000-000000000003', 'https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80', 'سجاد دائري رمادي', 'Tapis rond gris', 0),
('c1d2e3f4-0019-4000-8000-000000000019', 'b1c2d3e4-0013-4000-8000-000000000003', 'https://images.unsplash.com/photo-1514993430470-ac8fc0e56c92?w=800&q=80', 'سجاد دائري كحلي', 'Tapis rond bleu marine', 1),
('c1d2e3f4-001a-4000-8000-00000000001a', 'b1c2d3e4-0013-4000-8000-000000000003', 'https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80', 'سجاد دائري زهري', 'Tapis rond rose', 2),

-- Product 9: Lot 3 Pièces
('c1d2e3f4-001b-4000-8000-00000000001b', 'b1c2d3e4-0014-4000-8000-000000000004', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'طقم سجاد غرفة نوم أزرق', 'Lot tapis chambre bleu', 0),
('c1d2e3f4-001c-4000-8000-00000000001c', 'b1c2d3e4-0014-4000-8000-000000000004', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'طقم سجاد 3 قطع', 'Lot tapis 3 pièces', 1),
('c1d2e3f4-001d-4000-8000-00000000001d', 'b1c2d3e4-0014-4000-8000-000000000004', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد غرفة نوم متكامل', 'Tapis chambre complet', 2),
('c1d2e3f4-001e-4000-8000-00000000001e', 'b1c2d3e4-0014-4000-8000-000000000004', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'طقم سجاد بيج', 'Lot tapis beige', 3),

-- Product 10: Enfant Coloré
('c1d2e3f4-001f-4000-8000-00000000001f', 'b1c2d3e4-0021-4000-8000-000000000001', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'سجاد أطفال ملون', 'Tapis enfant coloré', 0),
('c1d2e3f4-0020-4000-8000-000000000020', 'b1c2d3e4-0021-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد أطفال مرح', 'Tapis enfant ludique', 1),
('c1d2e3f4-0021-4000-8000-000000000021', 'b1c2d3e4-0021-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد أطفال برسومات', 'Tapis enfant illustrations', 2),

-- Product 11: Enfant Cartoon
('c1d2e3f4-0022-4000-8000-000000000022', 'b1c2d3e4-0022-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80', 'سجاد أطفال شخصيات', 'Tapis enfant personnages', 0),
('c1d2e3f4-0023-4000-8000-000000000023', 'b1c2d3e4-0022-4000-8000-000000000002', 'https://images.unsplash.com/photo-1565193560280-0524bfc6b30c?w=800&q=80', 'سجاد أطفال كرتون', 'Tapis enfant cartoon', 1),
('c1d2e3f4-0024-4000-8000-000000000024', 'b1c2d3e4-0022-4000-8000-000000000002', 'https://images.unsplash.com/photo-1581858721551-1b5eef6c9f2e?w=800&q=80', 'سجاد أطفال ملون زاهي', 'Tapis enfant multicolore', 2),

-- Product 12: Enfant Éducatif
('c1d2e3f4-0025-4000-8000-000000000025', 'b1c2d3e4-0023-4000-8000-000000000003', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'سجاد تعليمي حروف', 'Tapis éducatif lettres', 0),
('c1d2e3f4-0026-4000-8000-000000000026', 'b1c2d3e4-0023-4000-8000-000000000003', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'سجاد تعليمي أرقام', 'Tapis éducatif chiffres', 1),
('c1d2e3f4-0027-4000-8000-000000000027', 'b1c2d3e4-0023-4000-8000-000000000003', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد أطفال تعليمي', 'Tapis enfant éducatif', 2),

-- Product 13: Couloir Classique
('c1d2e3f4-0028-4000-8000-000000000028', 'b1c2d3e4-0031-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد ممر كلاسيك', 'Tapis couloir classique', 0),
('c1d2e3f4-0029-4000-8000-000000000029', 'b1c2d3e4-0031-4000-8000-000000000001', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', 'سجاد ممر أحمر', 'Tapis couloir rouge', 1),
('c1d2e3f4-002a-4000-8000-00000000002a', 'b1c2d3e4-0031-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80', 'سجاد ممر طويل تقليدي', 'Tapis couloir long traditionnel', 2),

-- Product 14: Couloir Moderne
('c1d2e3f4-002b-4000-8000-00000000002b', 'b1c2d3e4-0032-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'سجاد ممر مودرن', 'Tapis couloir moderne', 0),
('c1d2e3f4-002c-4000-8000-00000000002c', 'b1c2d3e4-0032-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد ممر خطوط', 'Tapis couloir rayures', 1),
('c1d2e3f4-002d-4000-8000-00000000002d', 'b1c2d3e4-0032-4000-8000-000000000002', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'سجاد ممر رمادي', 'Tapis couloir gris', 2),

-- Product 15: Couloir Traditionnel
('c1d2e3f4-002e-4000-8000-00000000002e', 'b1c2d3e4-0033-4000-8000-000000000003', 'https://images.unsplash.com/photo-1515681194155-eeed6e4b1dbf?w=800&q=80', 'سجاد ممر تقليدي جزائري', 'Tapis couloir traditionnel algérien', 0),
('c1d2e3f4-002f-4000-8000-00000000002f', 'b1c2d3e4-0033-4000-8000-000000000003', 'https://images.unsplash.com/photo-1534534572755-7e6a7e1d8b8a?w=800&q=80', 'سجاد ممر أمازيغي', 'Tapis couloir amazigh', 1),
('c1d2e3f4-0030-4000-8000-000000000030', 'b1c2d3e4-0033-4000-8000-000000000003', 'https://images.unsplash.com/photo-1603804274091-3cc6f0d2e2c2?w=800&q=80', 'سجاد ممر بربري', 'Tapis couloir berbère', 2),
('c1d2e3f4-0031-4000-8000-000000000031', 'b1c2d3e4-0033-4000-8000-000000000003', 'https://images.unsplash.com/photo-1616878236211-3c2e7e2f8d4a?w=800&q=80', 'سجاد ممر تراثي', 'Tapis couloir patrimonial', 3),

-- Product 16: Extérieur Résistant
('c1d2e3f4-0032-4000-8000-000000000032', 'b1c2d3e4-0041-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'سجاد خارجي أخضر', 'Tapis extérieur vert', 0),
('c1d2e3f4-0033-4000-8000-000000000033', 'b1c2d3e4-0041-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد خارجي للشرفة', 'Tapis extérieur balcon', 1),
('c1d2e3f4-0034-4000-8000-000000000034', 'b1c2d3e4-0041-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد خارجي مقاوم', 'Tapis extérieur résistant', 2),

-- Product 17: Balcon Moderne
('c1d2e3f4-0035-4000-8000-000000000035', 'b1c2d3e4-0042-4000-8000-000000000002', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'سجاد شرفة أخضر', 'Tapis balcon vert', 0),
('c1d2e3f4-0036-4000-8000-000000000036', 'b1c2d3e4-0042-4000-8000-000000000002', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'سجاد شرفة مودرن', 'Tapis balcon moderne', 1),
('c1d2e3f4-0037-4000-8000-000000000037', 'b1c2d3e4-0042-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600573472556-1b2c6d0c3f0a?w=800&q=80', 'سجاد خارجي صغير', 'Tapis extérieur petit', 2),

-- Product 18: Jardin Grand
('c1d2e3f4-0038-4000-8000-000000000038', 'b1c2d3e4-0043-4000-8000-000000000003', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'سجاد حديقة كبير', 'Tapis jardin grand', 0),
('c1d2e3f4-0039-4000-8000-000000000039', 'b1c2d3e4-0043-4000-8000-000000000003', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'سجاد حديقة خارجي', 'Tapis jardin extérieur', 1),
('c1d2e3f4-003a-4000-8000-00000000003a', 'b1c2d3e4-0043-4000-8000-000000000003', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'سجاد باحة خارجية', 'Tapis patio extérieur', 2),

-- Product 19: Moquette Luxe Épaisse
('c1d2e3f4-003b-4000-8000-00000000003b', 'b1c2d3e4-0051-4000-8000-000000000001', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'موكيت فاخر سميك بيج', 'Moquette luxe épaisse beige', 0),
('c1d2e3f4-003c-4000-8000-00000000003c', 'b1c2d3e4-0051-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'موكيت فاخر رمادي', 'Moquette luxe grise', 1),
('c1d2e3f4-003d-4000-8000-00000000003d', 'b1c2d3e4-0051-4000-8000-000000000001', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80', 'موكيت سميك فاخر', 'Moquette épaisse luxe', 2),
('c1d2e3f4-003e-4000-8000-00000000003e', 'b1c2d3e4-0051-4000-8000-000000000001', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', 'موكيت غرف نوم فاخر', 'Moquette chambre luxe', 3),

-- Product 20: Moquette Bureaux
('c1d2e3f4-003f-4000-8000-00000000003f', 'b1c2d3e4-0052-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600166898405-e5b0e5f7e8f8?w=800&q=80', 'موكيت مكاتب رمادي', 'Moquette bureau grise', 0),
('c1d2e3f4-0040-4000-8000-000000000040', 'b1c2d3e4-0052-4000-8000-000000000002', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', 'موكيت تجاري مودرن', 'Moquette commerciale moderne', 1),
('c1d2e3f4-0041-4000-8000-000000000041', 'b1c2d3e4-0052-4000-8000-000000000002', 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', 'موكيت مكاتب أنيق', 'Moquette bureau élégante', 2);
