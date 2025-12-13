from database import engine, Base
from models import *
from sqlalchemy import text

def force_reset_db():
    print("🚀 Starting Force Database Reset...")
    
    # Database connection banakar raw SQL se tables udayenge
    with engine.connect() as conn:
        # Auto-commit mode on
        trans = conn.begin()
        try:
            print("💥 Dropping all tables using CASCADE...")
            
            # Hum 'public' schema ke saare tables ko drop kar denge
            conn.execute(text("DROP SCHEMA public CASCADE;"))
            conn.execute(text("CREATE SCHEMA public;"))
            conn.execute(text("GRANT ALL ON SCHEMA public TO public;"))
            
            trans.commit()
            print("✅ Database wiped clean (Old tables deleted).")
        except Exception as e:
            trans.rollback()
            print(f"❌ Error dropping tables: {e}")
            return

    # Ab naye tables banayenge
    print("🔄 Creating new tables from Models...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✅ New tables created successfully!")
    except Exception as e:
        print(f"❌ Error creating tables: {e}")

if __name__ == "__main__":
    force_reset_db()