-- Assessment Phases
INSERT INTO assessment_phases (id, name, question_count, cost_points) VALUES 
(1, 'Phase One: Domains', 25, 0),
(2, 'Phase Two: Majors', 30, 100)
ON CONFLICT (id) DO NOTHING;

-- Initial Questions (Sample of the 120 canonical set)
INSERT INTO questions (id, phase_id, category, text_ar, input_type, active) VALUES
(gen_random_uuid(), 1, 'Behavioral', 'لما تواجه مشكلة معقدة، تحب تبدأ من التفاصيل ولا من الصورة العامة؟', 'FORCED_TRADEOFF', true),
(gen_random_uuid(), 1, 'Academic', 'أي مادة دراسية كنت تستمتع فيها أكثر؟', 'SINGLE_SELECT', true),
(gen_random_uuid(), 1, 'Interest', 'في وقت فراغك، تميل أكثر للقراءة والبحث ولا الأنشطة الحركية؟', 'FORCED_TRADEOFF', true),
(gen_random_uuid(), 1, 'Social', 'تفضل العمل ضمن فريق كبير ولا شغلك يكون مستقل؟', 'FORCED_TRADEOFF', true),
(gen_random_uuid(), 1, 'Logic', 'هل تفضل المسائل اللي لها إجابة واحدة صحيحة، ولا الأسئلة المفتوحة؟', 'FORCED_TRADEOFF', true);

-- Universities (Sample)
INSERT INTO universities (id, name_ar, name_en, type, city) VALUES
(gen_random_uuid(), 'جامعة الملك سعود', 'King Saud University', 'Public', 'Riyadh'),
(gen_random_uuid(), 'جامعة الملك فهد للبترول والمعادن', 'KFUPM', 'Public', 'Dhahran'),
(gen_random_uuid(), 'جامعة الأميرة نورة', 'Princess Nourah University', 'Public', 'Riyadh');
